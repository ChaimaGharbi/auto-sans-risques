import temp from "temp";
import puppeteer, { Page } from "puppeteer";
import pdfMerge from "easy-pdf-merge";
import path from "path";
import utils from "util";
import fs from "fs";
import hb from "handlebars";
import reponse from "../models/reponse";

import rapport from "../models/rapport";
import category from "../models/category";
import { uploadFile } from "./uploadPdf";
import hbHelpers from "handlebars-helpers";

function random() {
  return Math.floor(Math.random() * 1000000);
}

hbHelpers();
hb.registerHelper("ifvalue", (conditional, options) => {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

const readFile = utils.promisify(fs.readFile);

async function getTemplateHtml() {
  console.log("Loading template file in memory");
  try {
    const tempPath = path.resolve(__dirname, `../templates/page.html`);
    return await readFile(tempPath, "utf8");
  } catch {
    throw new Error("Could not load html template");
  }
}

async function getHeaderTemplateHtml() {
  console.log("Loading header template file in memory");
  try {
    const tempPath = path.resolve(__dirname, `../templates/page-header.html`);
    return await readFile(tempPath, "utf8");
  } catch {
    throw new Error("Could not load html template");
  }
}

async function getLastPageTemplateHtml() {
  console.log("Loading template file in memory");
  try {
    const tempPath = path.resolve(
      __dirname,
      `../templates/page-last-page.html`
    );
    return await readFile(tempPath, "utf8");
  } catch {
    throw new Error("Could not load html template");
  }
}

async function getRapportReponses(rapportId) {
  const ctgList = await category.find({}).sort("priority");
  const data: any = [];
  for (let j = 0; j < ctgList.length; j++) {
    const reponses = await reponse
      .find({ rapportId, categoryId: ctgList[j]._id })
      .populate("categoryId", "category_name")
      .populate("questionId", ["question", "typeInput"])
      .sort({ date: 1 })
      .exec();
    const reponsesTab: any = [];
    for (let i = 0; i < reponses.length; i++) {
      const q = reponses[i].questionId as any;
      const r = reponses[i].reponse as any;
      const c = reponses[i].color as any;

      reponsesTab.push({
        question: q.question,
        reponse:
          q.typeInput === "date"
            ? new Date(r).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : r,
        comment: reponses[i].comment,
        color: c ? c : "black",
      });
    }
    data.push({
      category: ctgList[j].category_name,
      reponses: reponsesTab,
    });
  }
  return data;
}

async function getExpertAndClient(rapportId) {
  const rapportData = await rapport
    .findById(rapportId)
    .populate("clientId", ["fullName", "adresse", "tel", "ville"])
    .populate("expertId", ["fullName", "adresse", "tel", "ville", "signature"])
    .populate("reservationId")
    .exec();

  return {
    expert: rapportData?.expertId as any,
    client: rapportData?.clientId as any,
    reservation: rapportData?.reservationId as any,
    images: rapportData?.images as any,
  };
}

export const generatePDF = async (_pages, namePdf, date, cb) => {
  try {
    console.log("started");

    const res = await getTemplateHtml();
    const lastPage = await getLastPageTemplateHtml();

    const { expert, client, reservation, images } = await getExpertAndClient(
      namePdf
    );

    const raison = reservation.reason;
    const vehicule = reservation.typeCar;

    const data = await getRapportReponses(namePdf);

    console.log("Compiling the template with handlebars");
    const template = hb.compile(res, { strict: true });
    const lastPageTemplate = hb.compile(lastPage, { strict: true });

    const headerTemplate = await hb.compile(await getHeaderTemplateHtml(), {
      strict: true,
    });

    console.log({ expert });

    console.log("Launch puppeteer");

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const tab = await browser.newPage();

    try {
      const html = template({
        // client
        clientId: client._id,
        clientFullname: client.fullName,
        clientTel: client.tel,
        clientAdresse: client.adresse,
        clientVille: client.ville,

        // expert
        expertId: expert._id,
        expertFullname: expert.fullName,
        expertTel: expert.tel,
        expertAdresse: expert.adresse,
        expertVille: expert.ville,

        // reservation
        reservationId: reservation._id,
        reservationDate: new Date(reservation.date).toLocaleDateString(
          "fr-FR",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        ),
        reservationRaison: raison,
        reservationCar: vehicule,

        data: data,
        index: "0",
        date: "2022-08-22", // date.toLocaleDateString(undefined, options),
      });

      const lastPageHtml = lastPageTemplate({
        images,
        expertSignature: expert.signature,
      });

      const header = headerTemplate({
        id: namePdf,
        raison,
        vehicule,
      });

      console.log("Template compiled, generating pdf...");

      await tab.setContent(html);
      console.log("PDF generated, saving it to disk");
      const _path = path.resolve(__dirname, `../tmp/${namePdf}.pdf`);
      await tab.pdf({
        printBackground: true,
        path: _path,
        format: "A4",
        displayHeaderFooter: true,
        headerTemplate: header,
        footerTemplate: `
          <span style="margin: 0 25px; width:100% !important; display:flex; align-items: center; justify-content: space-between; font-size: 8px; font-weight: 400">
            <span class=title></span> 
            <span class="ml-auto"> 
            </span>
            </span>`,
        // <span class=pageNumber></span> / <span class=totalPages></span>
        margin: {
          top: "85px",
          bottom: "30px",
        },
      });

      await tab.setContent(lastPageHtml);
      const _lastPagePath = path.resolve(
        __dirname,
        `../tmp/${namePdf}-last.pdf`
      );
      await tab.pdf({
        printBackground: true,
        path: _lastPagePath,
        format: "A4",
        displayHeaderFooter: true,
        headerTemplate: header,
        footerTemplate: `
          <span style="margin: 0 25px; width:100% !important; display:flex; align-items: center; justify-content: space-between; font-size: 8px; font-weight: 400">
            <span class=title></span> 
            <span class="ml-auto"> 
            </span>
            </span>`,
        // <span>{}</span> / <span class=totalPages></span>
        margin: {
          top: "100px",
          bottom: "50px",
        },
      });

      const list = [
        path.join(__dirname, `../tmp/${namePdf}.pdf`),
        path.join(__dirname, `../tmp/${namePdf}-last.pdf`),
      ];

      await pdfMerge(
        list,
        path.join(__dirname, `../tmp/${namePdf}-final.pdf`),
        async (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Successfully merged!");
          // path of bf
          console.log("PDF saved to disk, closing browser");
          await browser.close();
          console.log("Browser closed, returning the path to the pdf");

          const url = await uploadFile(
            path.resolve(__dirname, `../tmp/${namePdf}-final.pdf`),
            namePdf + random(),
            "rapport",
            [
              path.resolve(__dirname, `../tmp/${namePdf}.pdf`),
              path.resolve(__dirname, `../tmp/${namePdf}-last.pdf`),
            ]
          );
          console.log(url);
          cb(url);
          console.info(tab);
        }
      );
    } catch (error) {
      console.log(error);
    }

    // try {
    //   pdfMerge(pdfList, rapportPdfPath, async (err) => {
    //     if (err) throw new Error(err.message);
    //     console.log("Successfully merged!");
    //     const data = fs.readFileSync(`${__dirname}` + `/${namePdf}.pdf`);
    //     // const result = await uploadFile(data, `${namePdf}.pdf`, "rapport");
    //     // console.log(result);
    //     for (let i = 0; i < pdfList.length; i++) {
    //       // fs.unlinkSync("./page" + i + ".pdf");
    //     }
    //     // ;
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  } catch (error) {
    console.log(error);
  }
};

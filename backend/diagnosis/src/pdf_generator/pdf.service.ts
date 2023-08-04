import {Injectable} from "@nestjs/common";
import * as puppeteer from "puppeteer";
import * as pdfMerge from "easy-pdf-merge";
import * as path from "path";
import * as utils from "util";
import * as fs from "fs";
import * as hb from "handlebars";
import * as handlebarsHelpers from "handlebars-helpers";
import {Model, Types} from "mongoose";
import {Rapport} from "../rapport/entities/rapport.entity";
import {QuestionCategory} from "../rapport/entities/quetion.category.entity";
import {Reponse} from "../rapport/entities/reponse.entity";
import {InjectModel} from "@nestjs/mongoose";


@Injectable()
export class PdfService {
    private readFile

    constructor(
        @InjectModel(Rapport.name) private readonly rapport: Model<Rapport>,
        @InjectModel(QuestionCategory.name) private readonly category: Model<QuestionCategory>,
        @InjectModel(Reponse.name) private readonly reponse: Model<Reponse>,
    ) {
        handlebarsHelpers();
        hb.registerHelper("ifvalue", (conditional, options) => {
            if (options.hash.value === conditional) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });

        this.readFile = utils.promisify(fs.readFile);
    }

    random() {
        return Math.floor(Math.random() * 1000000);
    }

    async getTemplateHtml() {
        console.log("Loading template file in memory");
        try {
            console.log("dirname", __dirname)
            const tempPath = path.resolve(__dirname, `./templates/page.html`);
            console.log("tempPath", tempPath)
            return await this.readFile(tempPath, "utf8");
        } catch (e) {
            console.log("error", e)
            throw new Error("Could not load html template");
        }
    }

    async getHeaderTemplateHtml() {
        console.log("Loading header template file in memory");
        try {
            const tempPath = path.resolve(__dirname, `./templates/page-header.html`);
            return await this.readFile(tempPath, "utf8");
        } catch {
            throw new Error("Could not load html template");
        }
    }

    async getLastPageTemplateHtml() {
        console.log("Loading template file in memory");
        try {
            const tempPath = path.resolve(
                __dirname,
                `./templates/page-last-page.html`
            );
            return await this.readFile(tempPath, "utf8");
        } catch {
            throw new Error("Could not load html template");
        }
    }

    async getRapportReponses(rapportId) {
        const ctgList = await this.category.find({}).sort("priority");
        const data: any = [];
        for (let j = 0; j < ctgList.length; j++) {
            const reponses = await this.reponse
                .find({rapportId: Types.ObjectId(rapportId), categoryId: Types.ObjectId(ctgList[j]._id)})
                .populate("categoryId", "category_name")
                .populate("questionId", ["question", "typeInput"])
                .sort({date: 1})
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

    async getExpertAndClient(rapportId) {
        const rapportData = await this.rapport
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

    async generatePDF(_pages, namePdf) {
        try {
            console.log("started");

            const res = await this.getTemplateHtml();
            const lastPage = await this.getLastPageTemplateHtml();

            const {expert, client, reservation, images} = await this.getExpertAndClient(
                namePdf
            );

            const raison = reservation.reason;
            const vehicule = reservation.typeCar;

            const data = await this.getRapportReponses(namePdf);

            console.log("Compiling the template with handlebars");
            const template = hb.compile(res, {strict: true});
            const lastPageTemplate = hb.compile(lastPage, {strict: true});

            const headerTemplate = await hb.compile(await this.getHeaderTemplateHtml(), {
                strict: true,
            });

            console.log({expert});

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
                const folderName = path.resolve(__dirname, `../pdfs`);
                if (!fs.existsSync(folderName)) {
                    try {
                        fs.mkdirSync(folderName);
                        console.log(`Folder '${folderName}' created successfully.`);
                    } catch (err) {
                        console.error('Error creating folder:', err);
                    }
                } else {
                    console.log(`Folder '${folderName}' already exists.`);
                }
                const _path = path.resolve(__dirname, `../pdfs/${namePdf}.pdf`);
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
                    `../pdfs/${namePdf}-last.pdf`
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
                    path.join(__dirname, `../pdfs/${namePdf}.pdf`),
                    path.join(__dirname, `../pdfs/${namePdf}-last.pdf`),
                ];

                await pdfMerge(
                    list,
                    path.join(__dirname, `../pdfs/${namePdf}-final.pdf`),
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

                        // const url = await uploadFile(
                        //     path.resolve(__dirname, `.../pdfs/${namePdf}-final.pdf`),
                        //     namePdf + this.random(),
                        //     "rapport",
                        //     [
                        //         path.resolve(__dirname, `.../pdfs/${namePdf}.pdf`),
                        //         path.resolve(__dirname, `.../pdfs/${namePdf}-last.pdf`),
                        //     ]
                        // );
                        // console.log(url);
                        // cb(url);
                        console.info(tab);
                    }
                );
                return "completed"
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

}
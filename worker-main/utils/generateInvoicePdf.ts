import puppeteer from "puppeteer";
const pdfMerge = require("easy-pdf-merge");
import path from "path";
import utils from "util";
import fs from "fs";
import hb from "handlebars";
import facture from "../models/facture";
const readFile = utils.promisify(fs.readFile);
import { uploadFile } from "./uploadPdf";

async function getTemplateHtml() {
  console.log("Loading template file in memory");
  try {
    const tempPath = path.resolve(__dirname, `../templates/invoice.html`);
    return await readFile(tempPath, "utf8");
  } catch {
    return Promise.reject("Could not load html template");
  }
}

export const generateInvoicePDF = (paymentData, expert, namePdf) => {
  try {
    return getTemplateHtml().then(async (res) => {
      hb.registerHelper("prix", function (value) {
        return value / 10;
      });
      const template = hb.compile(res, { strict: true });

      console.log("Launch puppeteer"); 

      // we have compile our code with handlebars

      // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
      const browser = await puppeteer.launch();

      const tab = await browser.newPage();

      const options = { year: "numeric", month: "2-digit", day: "numeric" };
      console.log(paymentData);
      const result = template({
        paymentData: paymentData,
        expert: expert,
        namePdf: namePdf,
        date: new Date().toLocaleDateString(undefined, options as any),
      });
      const html = result;
      await tab.setContent(html);
      await tab.pdf({ path: `${__dirname}` + `/${namePdf}.pdf` });
      await browser.close();
      const data = fs.readFileSync(`${__dirname}` + `/${namePdf}.pdf`);
      // const pdfResult = await uploadFile(data, `${namePdf}.pdf`, "invoice");
      fs.unlinkSync(`${__dirname}` + `/${namePdf}.pdf`);
      // return pdfResult;
    });
  } catch (error) {
    console.log(error);
  }
};

// const temp = require("temp");
// const puppeteer = require("puppeteer");
// const pdfMerge = require("easy-pdf-merge");
// const path = require("path");
// const utils = require("util");
// const fs = require("fs");
// const hb = require("handlebars");
// const readFile = utils.promisify(fs.readFile);

// const { uploadFile } = require("./uploadPdf");
// const facture = require("./models/facture");

// async function getTemplateHtml() {
//   console.log("Loading template file in memory");
//   try {
//     const tempPath = path.resolve(`${__dirname}` + `/invoice.html`);
//     return await readFile(tempPath, "utf8");
//   } catch (err) {
//     return Promise.reject("Could not load html template");
//   }
// }

// const generateInvoicePDF = async (paymentData, expert, namePdf) => {
//   try {
//     return getTemplateHtml().then(async (res) => {
//       hb.registerHelper("prix", function (value) {
//           return value /10;
//       });
//       const template = hb.compile(res, { strict: true });

//       console.log("Launch puppeteer");

//       // we have compile our code with handlebars

//       // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
//       const browser = await puppeteer.launch();

//       const tab = await browser.newPage();

//       const options = { year: "numeric", month: "2-digit", day: "numeric" };
//       console.log(paymentData);
//       const result = template({
//         paymentData: paymentData,
//         expert: expert,
//         namePdf: namePdf,
//         date: new Date().toLocaleDateString(undefined, options),
//       });
//       const html = result;
//       await tab.setContent(html);
//       await tab.pdf({ path: `${__dirname}` + `/${namePdf}.pdf` });
//       await browser.close();
//       const data = fs.readFileSync(`${__dirname}` + `/${namePdf}.pdf`);
//       const pdfResult = await uploadFile(data, `${namePdf}.pdf`,"invoice");
//       fs.unlinkSync(`${__dirname}` + `/${namePdf}.pdf`);
//       return pdfResult;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.generateInvoicePDF = generateInvoicePDF;

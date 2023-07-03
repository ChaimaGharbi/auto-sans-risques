import "dotenv/config";
// import Bull from "bull";
// import mongoose from "mongoose";
// import { generatePDF } from "./utils/generatePdf";
// const PORT = process.env.PORT || 3002;
// import rapport from "./models/rapport";
// import Facture from "./models/facture";
// import reservation from "./models/reservation";
// import Payment from "./models/payment";
// import expert from "./models/expert";
// import { generateInvoicePDF } from "./utils/generateInvoicePdf";
import PDFQueue from "./utils/pdf-queue";
import mongoConnect from "./utils/db";

mongoConnect()
  .then(() => {
    console.log("Mongodb connected");
    new PDFQueue(null);
  })
  .catch((err) => {
    console.log(err);
  });

// const invoicejob = new Bull("invoicejob", {
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
//   password: process.env.REDIS_PWD,
// });

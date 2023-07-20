import "dotenv/config";
import Bull, { QueueOptions } from "bull";
import { generatePDF } from "./generatePdf";
import rapport from "../models/rapport";
import reservation from "../models/reservation";

const options: Bull.QueueOptions = {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PWD,
  },
};

export default class PDFQueue {
  pdfQueue = new Bull("pdfjob", {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PWD,
    },
  });

  constructor(public socket) {
    this.pdfQueue.client.on("ready", () => {
      console.log("redis is ready");
    });

    this.pdfQueue.client.on("connect", () => {
      console.log("redis connected");
    });

    this.pdfQueue.client.on("close", () => {
      console.log("redis closed");
    });

    this.pdfQueue.client.on("end", (error) => {
      console.log("redis end", error);
    });

    this.pdfQueue.client.on("reconnecting", (error) => {
      console.log("redis reconnecting", error);
    });

    this.pdfQueue.client.on("error", (error) => {
      console.log("redis error", error.message);
    });

    this.onActive();
    this.onCompleted();
    this.onFailed();
    this.onError();

    this.pdfQueue.process("transcode",100, async (job, done) => {
      try {
        const startTime = +new Date(); 
        console.log("transcode job started", job.id);
        const namePdf = job.data.idRapport;
        const rapportToEdit = await rapport.findById(job.data.idRapport);
        if (!rapportToEdit) return;

        await generatePDF(
          job.data.content,
          namePdf,
          rapportToEdit.date,
          async (pdfLink) => {
            rapportToEdit.link = pdfLink;
            await rapportToEdit.save();
            const reservationEdit = await reservation.findOne({
              rapportId: job.data.idRapport,
            });
            if (!reservationEdit) return;
            reservationEdit.link = pdfLink.toString();
            reservationEdit.status = "COMPLETEE";
            await reservationEdit?.save();
          }
        );

        const endTime = +new Date(); // Record the end time
        const duration = endTime - startTime // Calculate the duration in milliseconds
        console.log("transcode job completed in", duration, "ms");
        this.pdfQueue.empty();
        return { link: rapportToEdit.link };
      } catch (error) {
        done(error as Error, null);
      }
    });
  }

  onActive() {
    this.pdfQueue.on("active", async (job) => {
      console.log("active", job.id);

      const socketReponse = {
        idRapport: job.data.idRapport,
      };
      this.socket?.emit("FromAPI", socketReponse);
      ////
      const rapportToEdit = await rapport.findById(job.data.idRapport);
      await rapportToEdit?.save();
    });
  }

  onCompleted() {
    this.pdfQueue.on("completed", (job, result) => {
      console.log("completed", job.id);
      const socketReponse = {
        idRapport: job.data.idRapport,
        etat: "complété",
        link: result,
      };
      this.socket?.emit("FromAPI", socketReponse);
    });
  }

  onFailed() {
    this.pdfQueue.on("failed", (job) => {
      console.log("failed", job.id);
      const socketReponse = {
        idRapport: job.data.idRapport,
        etat: "échoué",
      };
      this.socket?.emit("FromAPI", socketReponse);
      ////
      // const rapportToEdit = await rapport.findById(job.data.idRapport);
      // await rapportToEdit?.save();
    });
  }

  onError() {
    this.pdfQueue.on("error", (error) => {
      console.log("error", error);
    });
  }
}

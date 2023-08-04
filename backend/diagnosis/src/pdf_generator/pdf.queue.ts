import {Process, Processor} from '@nestjs/bull';
import {Job} from 'bull';
import {Model} from "mongoose";
import {Rapport} from "../rapport/entities/rapport.entity";
import {Reservation} from "../reservation/entities/reservation.entity";
import {PdfService} from "./pdf.service";
import {InjectModel} from "@nestjs/mongoose";

@Processor('pdfjob')
export class PDFProcessor {
    constructor(
        @InjectModel(Rapport.name) private readonly rapportModel: Model<Rapport>,
        @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
        private readonly pdfGenerator: PdfService) {
    }

    @Process({name: 'transcode', concurrency: 4})
    async transcode(job: Job<{ idRapport: string; content: string }>): Promise<any> {
        try {
            const startTime = +new Date();
            console.log('transcode job started', job.id);
            const namePdf = job.data.idRapport;
            const rapportToEdit = await this.rapportModel.findById(job.data.idRapport);
            if (!rapportToEdit) return;

            await this.pdfGenerator.generatePDF(job.data.content, namePdf);

            const endTime = +new Date();
            const duration = endTime - startTime;
            console.log('transcode job completed in', duration, 'ms');
            return "completed";
        } catch (error) {
            console.error('Error processing job:', error);
            return error;
        }
    }
}

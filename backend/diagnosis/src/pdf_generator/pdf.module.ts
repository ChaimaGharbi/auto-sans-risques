// pdf.module.ts
import {Module} from '@nestjs/common';
import {BullModule} from '@nestjs/bull';
import {PdfService} from './pdf.service';
import {PDFProcessor} from './pdf.queue';
import {MongooseModule} from '@nestjs/mongoose'; // Import MongooseModule
import {Rapport, RapportSchema} from '../rapport/entities/rapport.entity';
import {Reponse, ReponseSchema} from '../rapport/entities/reponse.entity';
import {QuestionCategory, QuestionCategorySchema} from '../rapport/entities/quetion.category.entity';
import {Reservation, ReservationSchema} from '../reservation/entities/reservation.entity';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PWD,
            },
        }),
        BullModule.registerQueue({
            name: 'pdfjob',
        }),
        MongooseModule.forFeature([
            {name: Rapport.name, schema: RapportSchema},
            {name: Reponse.name, schema: ReponseSchema},
            {name: QuestionCategory.name, schema: QuestionCategorySchema},
            {name: Reservation.name, schema: ReservationSchema},
        ]),
    ],
    providers: [PdfService, PDFProcessor],
})
export class PDFModule {
}

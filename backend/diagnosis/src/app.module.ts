import * as multer from 'multer';
import {AvisModule} from './avis/avis.module';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {RapportModule} from './rapport/rapport.module';
import {ReclamationModule} from './reclamation/reclamation.module';
import {ReservationModule} from './reservation/reservation.module';
import {NestjsFormDataModule} from 'nestjs-form-data';
import {BullModule} from '@nestjs/bull';
import {NotificationModule} from "./notification/notification.module";
import {PDFModule} from "./pdf_generator/pdf.module";


@Module({
    imports: [
        NestjsFormDataModule,
        // @ts-ignore
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: 'mongodb+srv://' +
                    process.env.MONGO_USER +
                    ':' +
                    process.env.MONGO_PASSWORD +
                    '@' +
                    process.env.MONGO_HOST +
                    '/' +
                    process.env.MONGO_DATABASE +
                    '?retryWrites=true&w=majority',
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        }),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PWD
            },
            defaultJobOptions: {
                delay: 5000,
                attempts: 3,
                timeout: 600000
            }
        }),
        MulterModule.register({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024
            }
        }),
        AvisModule,
        RapportModule,
        ReservationModule,
        ReclamationModule,
        NotificationModule,
        PDFModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}

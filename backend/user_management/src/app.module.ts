import * as multer from 'multer';
import {AuthModule} from './auth/auth.module';
import {ClientModule} from './client/client.module';
import {ExpertModule} from './expert/expert.module';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {NestjsFormDataModule} from 'nestjs-form-data';
import {BullModule} from '@nestjs/bull';
import * as dotenv from 'dotenv';
import {DisponibiliteModule} from "./disponibilite/disponibilite.module";
import {MarkModule} from "./mark/mark.module";
import {ModelModule} from "./model/model.module";
import {PaymentModule} from "./payment/payment.module";
import {RecoveryModule} from "./recovery/auth.module";
import {AdminModule} from "./admin/admin.module";
import {ModeratorModule} from "./moderator/moderator.module";


dotenv.config();

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
        AuthModule,
        MulterModule.register({
            storage: multer.memoryStorage(),
            limits: {
                fileSize: 10 * 1024 * 1024
            }
        }),
        ExpertModule,
        ClientModule,
        DisponibiliteModule,
        MarkModule,
        ModelModule,
        PaymentModule,
        RecoveryModule,
        AdminModule,
        ModeratorModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}

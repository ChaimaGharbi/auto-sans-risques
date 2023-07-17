import * as multer from 'multer';
// import {AuthModule} from './auth/auth.module';
import {AvisModule} from './avis/avis.module';
import {ConfigModule} from './config/mongo/config.module';
import {ConfigService} from './config/mongo/config.service';
import {MailerModule} from './config/mailer/mailer.module';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {RapportModule} from './rapport/rapport.module';
import {ReclamationModule} from './reclamation/reclamation.module';
import {ReservationModule} from './reservation/reservation.module';
import {NestjsFormDataModule} from 'nestjs-form-data';
import {BullModule} from '@nestjs/bull';

@Module({
    imports: [
        NestjsFormDataModule,
        ConfigModule,
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.getMongoConfig()
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
        // AuthModule,
        MailerModule,
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
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}

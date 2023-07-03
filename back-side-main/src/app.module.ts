import * as multer from 'multer';

import { ArticleModule } from './modules/article/article.module';
import { AssistanceModule } from './modules/assistance/assistance.module';
import { AuthModule } from './modules/auth/auth.module';
import { AvisModule } from './modules/avis/avis.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from './modules/client/client.module';
import { ConfigModule } from './config/mongo/config.module';
import { ConfigService } from './config/mongo/config.service';
import { DisponibiliteModule } from './modules/disponibilite/disponibilite.module';
import { ExpertModule } from './modules/expert/expert.module';
import { MailerModule } from './config/mailer/mailer.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PackModule } from './modules/pack/pack.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RapportModule } from './modules/rapport/rapport.module';
import { ReclamationModule } from './modules/reclamation/reclamation.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { SmsModule } from './config/sms/sms.module';
import { StatsModule } from './modules/stats/stats.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AdsModule } from './modules/ads/ads.module';
import { MarkModule } from './modules/mark/mark.module';

import { ModelModule } from './modules/model/model.module';
import { ModeratorModule } from './modules/moderator/moderator.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ContactModule } from './modules/contact/contact.module';
import { BullModule } from '@nestjs/bull';
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
    AuthModule,
    ContactModule,
    MailerModule,
    MulterModule.register({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    }),
    AvisModule,
    RapportModule,
    ExpertModule,
    ReservationModule,
    SmsModule,
    DisponibiliteModule,
    ArticleModule,
    ReclamationModule,
    AssistanceModule,
    PackModule,
    AdminModule,
    ModeratorModule,
    ClientModule,
    StatsModule,
    PaymentModule,
    NotificationModule,
    MarkModule,
    ModelModule,
    AdsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

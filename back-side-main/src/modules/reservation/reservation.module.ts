import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MailerService } from 'src/config/mailer/mailer.service';
import { SmsService } from 'src/config/sms/sms.service';
import { Client, ClientSchema } from 'src/entities/client.entity';
import { Expert, ExpertSchema } from 'src/entities/expert.entity';
import { Rapport, RapportSchema } from 'src/entities/rapport.entity';
import { Reservation, ReservationSchema } from 'src/entities/reservation.entity';
import { RapportRepository } from 'src/repositories/rapport.repository';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { ReservationController } from './reservation.controller';
import { ReservationGateway } from './reservation.gateway';
import { ReservationService } from './reservation.service';
import { NotificationSchema, Notification } from 'src/entities/notification.entity';
import { NotificationRepository } from 'src/repositories/notification.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: Reservation.name, schema: ReservationSchema },
      { name: Expert.name, schema: ExpertSchema },
      { name: Client.name, schema: ClientSchema }
    ])
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, SmsService, MailerService, ReservationGateway],
  exports: [ReservationRepository]
})
export class ReservationModule {}

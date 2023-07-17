import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {MailerService} from 'src/config/mailer/mailer.service';
import {Client, ClientSchema} from 'src/entities/client.entity';
import {Expert, ExpertSchema} from 'src/entities/expert.entity';
import {Reservation, ReservationSchema} from 'src/entities/reservation.entity';
import {ReservationController} from './reservation.controller';
import {ReservationGateway} from './reservation.gateway';
import {ReservationService} from './reservation.service';
import {Notification, NotificationSchema} from 'src/entities/notification.entity';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([
            {name: Notification.name, schema: NotificationSchema},
            {name: Reservation.name, schema: ReservationSchema},
            {name: Expert.name, schema: ExpertSchema},
            {name: Client.name, schema: ClientSchema}
        ])
    ],
    controllers: [ReservationController],
    providers: [ReservationService, MailerService, ReservationGateway],
    exports: [ReservationService]
})
export class ReservationModule {
}

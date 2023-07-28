import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {NotificationService} from './notification.service';
import {NotificationController} from './notification.controller';
import {MailerService} from 'src/shared/mailer/mailer.service';
import {NotificationGateway} from './notification.gateway';
import {Notification, NotificationSchema} from "./entities/notification.entity";
import {Reservation, ReservationSchema} from "../reservation/entities/reservation.entity";
import {Expert, ExpertSchema} from "../reservation/entities/expert.entity";
import {Client, ClientSchema} from "../reservation/entities/client.entity";

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
    controllers: [NotificationController],
    providers: [NotificationService, MailerService, NotificationGateway],
    exports: [NotificationService]
})
export class NotificationModule {
}

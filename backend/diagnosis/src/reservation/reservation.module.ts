import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {Client, ClientSchema} from './entities/client.entity';
import {Expert, ExpertSchema} from './entities/expert.entity';
import {Reservation, ReservationSchema} from './entities/reservation.entity';
import {ReservationController} from './reservation.controller';
import {ReservationGateway} from './reservation.gateway';
import {ReservationService} from './reservation.service';
import {Notification, NotificationSchema} from '../notification/entities/notification.entity';
import {MailerService} from "../shared/mailer/mailer.service";
import {JwtStrategy} from "../shared/jwt-strategy";

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
    providers: [ReservationService, MailerService, ReservationGateway, JwtStrategy],
    exports: [ReservationService]
})
export class ReservationModule {
}

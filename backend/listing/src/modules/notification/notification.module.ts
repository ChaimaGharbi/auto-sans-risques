import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

/* import { Client, ClientSchema } from 'src/entities/client.entity';
import { Expert, ExpertSchema } from 'src/entities/expert.entity'; */
import {NotificationService} from './notification.service';
import {NotificationController} from './notification.controller';
import {Notification, NotificationSchema} from 'src/entities/notification.entity';
import {Reservation, ReservationSchema} from 'src/entities/reservation.entity';
import {MailerService} from 'src/config/mailer/mailer.service';
import {NotificationGateway} from './notification.gateway';
import {Expert, ExpertSchema} from 'src/entities/expert.entity';
import {Client, ClientSchema} from 'src/entities/client.entity';

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

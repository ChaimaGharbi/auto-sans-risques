import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {StatsController} from './stats.controller';
import {StatsService} from './stats.service';
import {Expert, ExpertSchema} from "../reservation/entities/expert.entity";
import {Client, ClientSchema} from "../reservation/entities/client.entity";
import {Reservation, ReservationSchema} from "../reservation/entities/reservation.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Expert.name, schema: ExpertSchema},
            {name: Client.name, schema: ClientSchema},
            {name: Reservation.name, schema: ReservationSchema}
        ])
    ],
    controllers: [StatsController],
    providers: [StatsService],
    exports: [StatsService]
})
export class StatsModule {
}

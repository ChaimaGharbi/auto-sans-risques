import {Module} from '@nestjs/common';
import {ReclamationService} from './reclamation.service';
import {ReclamationController} from './reclamation.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Reclamation, ReclamationSchema} from './entities/reclamation.entity';
import {Reservation, ReservationSchema} from '../reservation/entities/reservation.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Reclamation.name, schema: ReclamationSchema},
            {name: Reservation.name, schema: ReservationSchema}
        ])
    ],
    providers: [ReclamationService],
    controllers: [ReclamationController],
    exports: [ReclamationService]
})
export class ReclamationModule {
}

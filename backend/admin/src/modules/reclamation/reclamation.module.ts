import { Module } from '@nestjs/common';
import { ReclamationService } from './reclamation.service';
import { ReclamationController } from './reclamation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamation, ReclamationSchema } from 'src/entities/reclamation.entity';
import { Reservation, ReservationSchema } from 'src/entities/reservation.entity';

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
export class ReclamationModule {}

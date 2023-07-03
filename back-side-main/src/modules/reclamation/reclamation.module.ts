import { Module } from '@nestjs/common';
import { ReclamationService } from './reclamation.service';
import { ReclamationController } from './reclamation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamation, ReclamationSchema } from 'src/entities/reclamation.entity';
import { Reservation, ReservationSchema } from 'src/entities/reservation.entity';
import { ReclamationRepository } from 'src/repositories/reclamation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reclamation.name, schema: ReclamationSchema },
      { name: Reservation.name, schema: ReservationSchema }
    ])
  ],
  providers: [ReclamationService, ReclamationRepository],
  controllers: [ReclamationController],
  exports: [ReclamationRepository]
})
export class ReclamationModule {}

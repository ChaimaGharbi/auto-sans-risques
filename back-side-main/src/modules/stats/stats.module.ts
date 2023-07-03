import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/entities/client.entity';
import { Expert, ExpertSchema } from 'src/entities/expert.entity';
import { Reservation, ReservationSchema } from 'src/entities/reservation.entity';
import { StatsRepository } from 'src/repositories/stats.repository';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expert.name, schema: ExpertSchema },
      { name: Client.name, schema: ClientSchema },
      { name: Reservation.name, schema: ReservationSchema }
    ])
  ],
  controllers: [StatsController],
  providers: [StatsService, StatsRepository],
  exports: [StatsService]
})
export class StatsModule {}

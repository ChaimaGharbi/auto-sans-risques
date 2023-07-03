import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Assistance, AssistanceSchema } from 'src/entities/assistance.entity';
import { AssistanceRepository } from 'src/repositories/assistance.repository';
import { AssistanceController } from './assistance.controller';
import { AssistanceService } from './assistance.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Assistance.name, schema: AssistanceSchema }])],
  controllers: [AssistanceController],
  providers: [AssistanceService, AssistanceRepository]
})
export class AssistanceModule {}

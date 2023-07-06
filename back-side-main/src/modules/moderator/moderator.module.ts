import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Moderator, ModeratorSchema } from 'src/entities/moderator.entity';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Moderator.name, schema: ModeratorSchema }])],
  controllers: [ModeratorController],
  providers: [ModeratorService]
})
export class ModeratorModule {}

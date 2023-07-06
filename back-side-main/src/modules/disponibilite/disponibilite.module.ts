import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Disponibilite, DisponibiliteSchema } from 'src/entities/disponibilite.entity';
import { Expert, ExpertSchema } from 'src/entities/expert.entity';
import { DisponibiliteController } from './disponibilite.controller';
import { DisponibiliteService } from './disponibilite.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    MongooseModule.forFeature([
      { name: Disponibilite.name, schema: DisponibiliteSchema },
      { name: Expert.name, schema: ExpertSchema }
    ])
  ],
  controllers: [DisponibiliteController],
  providers: [DisponibiliteService]
})
export class DisponibiliteModule {}

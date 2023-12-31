import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Expert, ExpertSchema } from 'src/entities/expert.entity';
import { ExpertRepository } from 'src/repositories/expert.repository';
import { ExpertController } from './expert.controller';
import { ExpertService } from './expert.service';
import { Model, ModelSchema } from 'src/entities/model.entity';
import { Mark, MarkSchema } from 'src/entities/mark.entity';
import { PassportModule } from '@nestjs/passport';
import { Disponibilite } from 'src/entities/disponibilite.entity';
import { DisponibiliteSchema } from 'src/entities/disponibilite.entity';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    MongooseModule.forFeature([
      { name: Expert.name, schema: ExpertSchema },
      { name: Model.name, schema: ModelSchema },
      { name: Mark.name, schema: MarkSchema },
      { name: Disponibilite.name, schema: DisponibiliteSchema }
    ])
  ],
  controllers: [ExpertController],
  providers: [ExpertService, ExpertRepository],
  exports: [ExpertService, ExpertRepository]
})
export class ExpertModule {}

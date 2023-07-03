import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Model, ModelSchema } from 'src/entities/model.entity';
import { Mark, MarkSchema } from 'src/entities/mark.entity';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';
import { MarkRepository } from 'src/repositories/mark.repository';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    MongooseModule.forFeature([
      { name: Mark.name, schema: MarkSchema }, 
      { name: Model.name, schema: ModelSchema },
    ])
  ],
  controllers: [MarkController],
  providers: [MarkService,MarkRepository],
  exports: [MarkRepository]
})
export class MarkModule {}
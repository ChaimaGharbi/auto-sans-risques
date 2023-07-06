import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Model, ModelSchema } from 'src/entities/model.entity';
import { Mark, MarkSchema } from 'src/entities/mark.entity';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([
            {name: Model.name, schema: ModelSchema},
            {name: Mark.name, schema: MarkSchema},
        ])
    ],
    controllers: [ModelController],
    providers: [ModelService],
    exports: [ModelService]
})
export class ModelModule {}
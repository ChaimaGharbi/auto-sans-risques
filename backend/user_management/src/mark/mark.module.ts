import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {Mark, MarkSchema} from './entities/mark.entity';
import {Model, ModelSchema} from '../model/entities/model.entity';
import {MarkController} from './mark.controller';
import {MarkService} from './mark.service';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([
            {name: Mark.name, schema: MarkSchema},
            {name: Model.name, schema: ModelSchema},
        ])
    ],
    controllers: [MarkController],
    providers: [MarkService],
    exports: [MarkService]
})
export class MarkModule {
}
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Expert, ExpertSchema} from 'src/expert/entities/expert.entity';
import {ExpertController} from './expert.controller';
import {ExpertService} from './expert.service';
import {Model, ModelSchema} from './entities/model.entity';
import {Mark, MarkSchema} from './entities/mark.entity';
import {PassportModule} from '@nestjs/passport';
import {Disponibilite} from './entities/disponibilite.entity';
import {DisponibiliteSchema} from './entities/disponibilite.entity';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([
            {name: Expert.name, schema: ExpertSchema},
            {name: Model.name, schema: ModelSchema},
            {name: Mark.name, schema: MarkSchema},
            {name: Disponibilite.name, schema: DisponibiliteSchema}
        ])
    ],
    controllers: [ExpertController],
    providers: [ExpertService],
    exports: [ExpertService]
})
export class ExpertModule {
}

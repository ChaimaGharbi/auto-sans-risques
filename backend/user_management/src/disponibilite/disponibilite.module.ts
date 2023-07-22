import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DisponibiliteController} from './disponibilite.controller';
import {DisponibiliteService} from './disponibilite.service';
import {PassportModule} from '@nestjs/passport';
import {Expert, ExpertSchema} from "../expert/entities/expert.entity";
import {Disponibilite, DisponibiliteSchema} from "./entities/disponibilite.entity";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([
            {name: Disponibilite.name, schema: DisponibiliteSchema},
            {name: Expert.name, schema: ExpertSchema}
        ])
    ],
    controllers: [DisponibiliteController],
    providers: [DisponibiliteService]
})
export class DisponibiliteModule {
}

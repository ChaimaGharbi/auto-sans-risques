import {MiddlewareConsumer, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Rapport, RapportSchema} from './entities/rapport.entity';
import {RapportController} from './rapport.controller';
import {RapportService} from './rapport.service';
import {router} from 'bull-board';
import {BullModule} from '@nestjs/bull';
import {QuestionCategory, QuestionCategorySchema} from './entities/quetion.category.entity';
import {Question, QuestionSchema} from './entities/question.entity';
import {Reponse, ReponseSchema} from './entities/reponse.entity';
import {NestjsFormDataModule} from 'nestjs-form-data';

import {PassportModule} from '@nestjs/passport';
import {RapportGateway} from './rapport.gateway';
import {Reservation, ReservationSchema} from "../reservation/entities/reservation.entity";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([
            {name: Rapport.name, schema: RapportSchema},
            {name: Reponse.name, schema: ReponseSchema},
            {name: QuestionCategory.name, schema: QuestionCategorySchema},
            {name: Question.name, schema: QuestionSchema},
            {name: Reservation.name, schema: ReservationSchema}
        ]),
        BullModule.registerQueue({
            name: 'pdfjob'
        })
    ],
    controllers: [RapportController],
    providers: [RapportService, RapportGateway],
    exports: [RapportService]
})
export class RapportModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(router).forRoutes('/admin/queues');
    }
}

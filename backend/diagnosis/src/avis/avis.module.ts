import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Avis, AvisSchema} from './entities/avis.entity';
import {Expert, ExpertSchema} from '../reservation/entities/expert.entity';
import {ImageAvis, ImageAvisSchema} from './entities/image_avis.entity';
import {AvisController} from './avis.controller';
import {AvisService} from './avis.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Avis.name, schema: AvisSchema},
            {name: Expert.name, schema: ExpertSchema},
            {name: ImageAvis.name, schema: ImageAvisSchema}
        ])
    ],
    controllers: [AvisController],
    providers: [AvisService],
    exports: [AvisService]
})
export class AvisModule {
}

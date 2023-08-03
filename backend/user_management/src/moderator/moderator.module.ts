import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ModeratorController} from './moderator.controller';
import {ModeratorService} from './moderator.service';
import {Moderator, ModeratorSchema} from "./entities/moderator.entity";

@Module({
    imports: [MongooseModule.forFeature([{name: Moderator.name, schema: ModeratorSchema}])],
    controllers: [ModeratorController],
    providers: [ModeratorService]
})
export class ModeratorModule {
}

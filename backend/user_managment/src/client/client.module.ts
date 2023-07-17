import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Client, ClientSchema} from 'src/client/entities/client.entity';
import {ClientController} from './client.controller';
import {ClientService} from './client.service';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([{name: Client.name, schema: ClientSchema}])
    ],
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientModule {
}

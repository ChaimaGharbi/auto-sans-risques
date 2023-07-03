import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/entities/client.entity';
import { ClientRepository } from 'src/repositories/client.repository';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])
  ],
  controllers: [ClientController],
  providers: [ClientService, ClientRepository]
})
export class ClientModule {}

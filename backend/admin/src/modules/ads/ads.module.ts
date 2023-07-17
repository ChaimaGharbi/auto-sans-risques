import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

/* import { Client, ClientSchema } from 'src/entities/client.entity';
import { Expert, ExpertSchema } from 'src/entities/expert.entity'; */
import {AdsService} from './ads.service';
import {AdsController} from './ads.controller';
import {Ads, AdsSchema} from 'src/entities/ads.entity';

/* import { Expert, ExpertSchema } from 'src/entities/expert.entity';
import { Client, ClientSchema } from 'src/entities/client.entity'; */

@Module({
  imports: [
      PassportModule.register({
          defaultStrategy: 'jwt'
      }),
      MongooseModule.forFeature([
          {name: Ads.name, schema: AdsSchema},
          /* { name: Expert.name, schema: ExpertSchema },
          { name: Client.name, schema: ClientSchema }  */
      ])
  ],
    controllers: [AdsController],
    providers: [AdsService],
    exports: [AdsService]
})
export class AdsModule {}
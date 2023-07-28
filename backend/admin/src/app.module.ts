import * as multer from 'multer';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {NestjsFormDataModule} from 'nestjs-form-data';
import {BullModule} from '@nestjs/bull';
import {AdminModule} from "./admin/admin.module";
import {ModeratorModule} from "./moderator/moderator.module";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({

  imports: [
    NestjsFormDataModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://' +
            process.env.MONGO_USER +
            ':' +
            process.env.MONGO_PASSWORD +
            '@' +
            process.env.MONGO_HOST +
            '/' +
            process.env.MONGO_DATABASE +
            '?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PWD
      },
      defaultJobOptions: {
        delay: 5000,
        attempts: 3,
        timeout: 600000
      }
    }),
    MulterModule.register({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    }),
    AdminModule,
    ModeratorModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

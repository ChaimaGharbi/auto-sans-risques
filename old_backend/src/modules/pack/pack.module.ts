import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Pack, PackSchema} from 'src/entities/pack.entity';
import {PackController} from './pack.controller';
import {PackService} from './pack.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pack.name, schema: PackSchema }])],
  controllers: [PackController],
  providers: [PackService]
})
export class PackModule {}

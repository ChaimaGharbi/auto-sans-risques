import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';
import {Admin, AdminSchema} from "./entities/admin.entity";

@Module({
  imports: [MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {
}

import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Admin, AdminSchema} from 'src/entities/admin.entity';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}])],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {
}

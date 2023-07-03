import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/entities/admin.entity';
import { AdminRepository } from 'src/repositories/admin.repository';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository]
})
export class AdminModule {}

import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {AdminDto} from './dto/admin.dto';
import {filterAdminDto} from './dto/filterAdmin.dto';
import {GenericRepository} from "../../shared/generic/generic.repository";
import {Admin} from "../../entities/admin.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class AdminService {
    private readonly adminRepository: GenericRepository<Admin>

    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    ) {
        this.adminRepository = new GenericRepository(adminModel);
    }


    async fetchAdmins(filterAdminDto: filterAdminDto) {
        try {
            return await this.adminRepository.aggregate(filterAdminDto);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async fetchAdminId(id: any) {
        try {
            return await this.adminRepository.findById(id);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateAdmin(id: any, adminDto: AdminDto) {
        try {
            const admin = await this.adminRepository.findById(id);
            admin.fullName = adminDto.fullName;
            admin.tel = adminDto.tel;
            admin.isVerified = adminDto.isVerified;
            await admin.save();
            return admin;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async deleteAdminById(id: any) {
        try {
            await this.adminRepository.delete(id);
            return 'Admin deleted';
        } catch (error) {
            return error
        }
    }

    async deleteAdminsByIds(ids: any) {
        try {
            await this.adminRepository.deleteManyByIds(ids);
            return 'Admins deleted';
        } catch (error) {
            return error
        }
    }
}

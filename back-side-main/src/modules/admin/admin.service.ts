import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {AdminDto} from './dto/admin.dto';
import {filterAdminDto} from './dto/filterAdmin.dto';
import {pagination} from "../../shared/pagination";
import {GenericRepository} from "../../shared/generic.repository";
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
            const pipelines = [];
            const options = {
                page: filterAdminDto.pageNumber,
                limit: filterAdminDto.pageSize
            };
            pipelines.push({
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            });
            pipelines.push({
                $project: {
                    salt: 0,
                    password: 0
                }
            });
            const {fullName, _id, email} = filterAdminDto.filter;

            interface IMatch {
                fullName?: any;
                _id?: any;
                email?: any;
            }

            const match: IMatch = {};
            if (fullName) match.fullName = {$regex: fullName, $options: 'i'};
            if (_id) match._id = {$regex: _id, $options: 'i'};
            if (email) match.email = {$regex: email, $options: 'i'};
            pipelines.push({$match: match});

            //filter by date
            const sortOrderU = filterAdminDto.sortOrder === 'desc' ? -1 : 1;

            pipelines.push({$sort: {createdAt: sortOrderU}});
            const myAgregate = pagination(pipelines, options);
            const mypipeline = await this.adminRepository.aggregate(myAgregate);

            return mypipeline[0];
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
            throw new InternalServerErrorException(error);
        }
    }

    async deleteAdminsByIds(ids: any) {
        try {
            await this.adminRepository.deleteManyByIds(ids);
            return 'Admins deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}

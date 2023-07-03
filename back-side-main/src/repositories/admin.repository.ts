import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/entities/admin.entity';
import { AdminDto } from 'src/modules/admin/dto/admin.dto';
import { filterAdminDto } from 'src/modules/admin/dto/filterAdmin.dto';
import { pagination } from 'src/shared/pagination';

export class AdminRepository {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async fetchAdmins(filterAdminDto: filterAdminDto) {
    try {
      const pipelines = [];
      const options = {
        page: filterAdminDto.pageNumber,
        limit: filterAdminDto.pageSize
      };
      pipelines.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });
      pipelines.push({
        $project: {
          salt: 0,
          password: 0
        }
      });
      const { fullName, _id, email } = filterAdminDto.filter;
      
      interface IMatch {
        fullName?: any;
        _id?: any;
        email?: any;
      }
      const match: IMatch = {};
      if (fullName) match.fullName = { $regex: fullName, $options: 'i' };
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (email) match.email = { $regex: email, $options: 'i' };
      pipelines.push({ $match: match });
      
      //filter by date
      const sortOrderU = filterAdminDto.sortOrder === 'desc' ? -1 : 1;
      
      pipelines.push({ $sort: { createdAt: sortOrderU } });
      const myAgregate = pagination(pipelines, options);
      const mypipeline = await this.adminModel.aggregate(myAgregate);
      
      return mypipeline[0];
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async fetchAdminId(id: any) {
    try {
      const admin = await this.adminModel.findById(id);
      if (!admin) {
        return new NotFoundException();
      } else return admin;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateAdmin(id: any, adminDto: AdminDto) {
    try {
      const admin = await this.adminModel.findById(id);
      if (!admin) {
        return new NotFoundException('No admin found');
      }
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
      const admin = await this.adminModel.findByIdAndDelete(id);
      if (!admin) {
        return new NotFoundException('admin not found');
      }
      return 'Admin deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAdminsByIds(ids: any) {
    try {
      await this.adminModel.deleteMany({ _id: { $in: ids } });
      return 'Admins deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

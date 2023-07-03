import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Moderator } from 'src/entities/moderator.entity';
import { ModeratorDto } from 'src/modules/moderator/dto/moderator.dto';
import { filterModeratorDto } from 'src/modules/moderator/dto/filterModerator.dto';
import { pagination } from 'src/shared/pagination';

export class ModeratorRepository {
  constructor(@InjectModel(Moderator.name) private moderatorModel: Model<Moderator>) {}

  async fetchModerators(filterModeratorDto: filterModeratorDto) {
    try {
      const pipelines = [];
      const options = {
        page: filterModeratorDto.pageNumber,
        limit: filterModeratorDto.pageSize,
      };
      pipelines.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });
      pipelines.push({
        $project: {
          salt: 0,
          password: 0,
        }
      });
      const { fullName,_id,email } = filterModeratorDto.filter;
      
      interface IMatch {
        fullName?:any;
        _id?:any;
        email?:any;
      }
      const match: IMatch = {};
      if (fullName) match.fullName = { $regex: fullName, $options: 'i' };
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (email) match.email = { $regex: email, $options: 'i' };
      pipelines.push({ $match: match });
      
      //filter by date
      const sortOrderU = filterModeratorDto.sortOrder === 'desc' ? -1 : 1;
      
      pipelines.push({ $sort: { createdAt: sortOrderU } });
      const myAgregate = pagination(pipelines,options)
      const mypipeline = await this.moderatorModel.aggregate(myAgregate)
      
      
      return mypipeline[0];
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async fetchModeratorId(id: any) {
    try {
      const moderator = await this.moderatorModel.findById(id).select('-password -salt');
      if (!moderator) {
        return new NotFoundException();
      } else return moderator;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateModerator(id: any, moderatorDto: ModeratorDto) {
    try {
      const moderator = await this.moderatorModel.findById(id).select('-password -salt');
      if (!moderator) {
        return new NotFoundException('No moderator found');
      }
      
      moderator.fullName = moderatorDto.fullName;
      moderator.tel = moderatorDto.tel;
      moderator.allows = moderatorDto.allows;
      moderator.isVerified = moderatorDto.isVerified;
      await moderator.save();
      return moderator;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

 

  async deleteModeratorById(id: any) {
    try {
      const moderator = await this.moderatorModel.findByIdAndDelete(id);
      if (!moderator) {
        return new NotFoundException('moderator not found');
      }
      return 'Moderator deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteModeratorsByIds(ids: any) {
    try {
      await this.moderatorModel.deleteMany({ _id: { $in: ids } });
      return 'Moerators deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

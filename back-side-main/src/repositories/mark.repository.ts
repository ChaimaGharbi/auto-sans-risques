import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as ModelCar } from 'src/entities/model.entity';
import { Model, Types } from 'mongoose';
import { Mark } from 'src/entities/mark.entity';
import { MarkDto } from 'src/modules/mark/dto/mark.dto';
import { filterMarkDto } from 'src/modules/mark/dto/filterMark.dto';
import { IMarkModel } from 'src/entities/mark.interface';
import { pagination } from 'src/shared/pagination';

export class MarkRepository {
  constructor(
    //@InjectModel(Mark.name) private markModel: Model<Mark>,
    @InjectModel(Mark.name) private markModel: IMarkModel,

    @InjectModel(ModelCar.name) private modelCarModel: Model<ModelCar>
  ) {}

  async createMark(markModel: MarkDto) {
    try {
      const markCar = new this.markModel(markModel);

      const mark = await markCar.save();
      const modelCar = await this.modelCarModel.findById(mark.modelId);
      modelCar.marks = [...modelCar.marks, mark._id];
      await modelCar.save();
      return mark;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMarks(filterMarkDto: filterMarkDto) {
    try {
      const options = {
        page: filterMarkDto.pageNumber,
        limit: filterMarkDto.pageSize,
        /*  page: 1,
        limit: 2, */
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };
      const myAggregate = await this.markModel.find().populate('modelId').sort({ priority: -1 });

      const markCar = await this.markModel.aggregatePaginate(myAggregate, options, null);

      return markCar;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMarksByModelId(modelId: any, filterMarkDto: filterMarkDto) {
    try {
      const pipelines = [];
      const options = {
        page: filterMarkDto.pageNumber,
        limit: filterMarkDto.pageSize
      };
      const { name } = filterMarkDto.filter;
      interface IMatch {
        name?: any;
        modelId?: any;
      }
      const match: IMatch = {};
      if (modelId) match.modelId = Types.ObjectId(modelId);
      pipelines.push({ $match: match });
      if (name) match.name = { $regex: name, $options: 'i' };

      //filter by date
      const sortOrderU = filterMarkDto.sortOrder === 'desc' ? -1 : 1;

      pipelines.push({ $sort: { createdAt: sortOrderU } });
      const myAgregate = pagination(pipelines, options);
      const mypipeline = await this.markModel.aggregate(myAgregate);

      return mypipeline[0];
      // return markCar;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getMarkById(id: any) {
    try {
      const markCar = await this.markModel.findById(id).populate('modelId').sort({ priority: -1 });

      return markCar;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateMarkById(markDto: MarkDto, id: any) {
    try {
      const markCar = await this.markModel.findById(id);
      if (!markCar) {
        return new NotFoundException('Mark not found');
      }

      markCar.name = markDto.name;
      await markCar.save();
      return markCar;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteMarkById(id: any) {
    try {
      const model = await this.markModel.findByIdAndDelete(id);
      if (!model) {
        return new NotFoundException('Mark not found');
      }
      return 'Mark deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteMarksByIds(ids: any) {
    try {
      await this.markModel.deleteMany({ _id: { $in: ids } });
      return 'Marks deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

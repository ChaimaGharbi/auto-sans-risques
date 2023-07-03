import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as ModelCar } from 'src/entities/model.entity';
import { ModelDto } from 'src/modules/model/dto/model.dto';
import { Model } from 'mongoose';
import { Mark } from 'src/entities/mark.entity';

import { IModelCar } from 'src/entities/model.interface';
import { filterModelDto } from 'src/modules/model/dto/filterModel.dto';
import { pagination } from 'src/shared/pagination';


export class ModelRepository {
  constructor(
    @InjectModel(ModelCar.name) private modelCarModel: IModelCar,
   // @InjectModel(ModelCar.name) private modelCarModel: Model<ModelCar>,
    @InjectModel(Mark.name) private markModel: Model<Mark>,
  ) {}

  async createModel(modelDto: ModelDto) {
    try {
     
     const modelCar = new this.modelCarModel(modelDto);
     
     const model = await modelCar.save();
     return model;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getModels(filterModelDto: filterModelDto) {
    try {
      const pipelines = [];
      const options = {
        page: filterModelDto.pageNumber,
        limit: filterModelDto.pageSize,
      };
      if (filterModelDto.withChoose) {
        return await this.modelCarModel.aggregate([
          {
            '$lookup': {
              'from': 'marks', 
              'localField': 'marks', 
              'foreignField': '_id', 
              'as': 'marks'
            }
          }, {
            '$project': {
              'marks.name': 1, 
              'marks._id': 1, 
              'name': 1, 
              '_id': 1
            }
          }, {
            '$addFields': {
              'id': '$_id', 
              'label': '$name', 
              'children': '$marks'
            }
          }, {
            '$project': {
              'marks': 0, 
              '_id': 0, 
              'name': 0
            }
          }, {
            '$project': {
              'id': 1, 
              'label': 1, 
              'children': {
                '$map': {
                  'input': '$children', 
                  'as': 'sec', 
                  'in': {
                    'label': '$$sec.name', 
                    'id': '$$sec._id'
                  }
                }
              }
            }
          }, {
            '$replaceRoot': {
              'newRoot': {
                '$cond': {
                  'if': {
                    '$ne': [
                      '$children', []
                    ]
                  }, 
                  'then': '$$ROOT', 
                  'else': {
                    'id': '$id', 
                    'label': '$label'
                  }
                }
              }
            }
          }
        ])
      }
      pipelines.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });
      const { name,_id } = filterModelDto.filter;
      
      interface IMatch {
        name?:any;
        _id?:any;
        modelId?: any;
      }
      const match: IMatch = {};
      if (name) match.name = { $regex: name, $options: 'i' };
      if (_id) match._id = { $regex: _id, $options: 'i' };
      pipelines.push({ $match: match });
      
      //filter by date
      const sortOrderU = filterModelDto.sortOrder === 'desc' ? -1 : 1;
      
      pipelines.push({ $sort: { createdAt: sortOrderU } });
      const myAgregate = pagination(pipelines,options)
      const mypipeline = await this.modelCarModel.aggregate(myAgregate)
      
      
      return mypipeline[0];

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  async getModelById(id: any) {
    try {
     const modelCar = await this.modelCarModel.findById(id).populate('marks').sort({ priority: -1 });
     
     return modelCar;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  

  async updateModel(modelDto: ModelDto, id: any) {
    try {
      const modelCar = await this.modelCarModel.findById(id);
      if (!modelCar) {
        return new NotFoundException('Model not found');
      }
      modelCar.marks = modelDto.marks;
      modelCar.name= modelDto.name
      
      await modelCar.save();
     return modelCar;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteModelById(id: any) {
    try {
      const model = await this.modelCarModel.findByIdAndDelete(id);
      if (!model) {
        return new NotFoundException('Model not found');
      }
      return 'model deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteModelsByIds(ids: any) {
    try {
      await this.modelCarModel.deleteMany({ _id: { $in: ids } });
      return 'Models deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ModelRepository } from 'src/repositories/model.repository';
import { filterModelDto } from './dto/filterModel.dto';
import { ModelDto } from './dto/model.dto';

@Injectable()
export class ModelService {
  constructor(private modelRepository: ModelRepository) {}
  async create(modelDto: ModelDto) {
   // return 'This action adds a new model';
    return await this.modelRepository.createModel(modelDto);
  }

  async findAll(filterModelDto:filterModelDto) {
   // return `This action returns all models`;
    return await this.modelRepository.getModels(filterModelDto);
  }

  async findOne(id: any) {
    return await this.modelRepository.getModelById(id);
    //return `This action returns a #${id} model`;
  }

  async update(id: any, modelDto: ModelDto) {
    //return `This action updates a #${id} model`;
    return await this.modelRepository.updateModel(modelDto, id);
  }
  

  async remove(id: any) {
   // return `This action removes a #${id} model`;
    return await this.modelRepository.deleteModelById(id);

  }
  
  async deleteModelsByIds(ids: any) {
    return await this.modelRepository.deleteModelsByIds(ids);
  }
}

import { Injectable } from '@nestjs/common';
import { MarkRepository } from 'src/repositories/mark.repository';
import { filterMarkDto } from './dto/filterMark.dto';
import { MarkDto } from './dto/mark.dto';

@Injectable()
export class MarkService {
  constructor(private markRepository: MarkRepository) {}
  async create(markDto: MarkDto) {
    //return 'This action adds a new mark';
    return await this.markRepository.createMark(markDto);

  }
  async findAll(filterMarkDto:filterMarkDto) {
    // return `This action returns all models`;
    
     return await this.markRepository.getMarks(filterMarkDto);
   }
   async findAllByModelId(modelId:any,filterMarkDto:filterMarkDto) {
    // return `This action returns all models`;
    
     return await this.markRepository.getMarksByModelId(modelId,filterMarkDto);
   }
   
  async findOne(id: any) {
     //return `This action returns a #${id} model`;
     return await this.markRepository.getMarkById(id);
     
   }
 
   async update(id: any, markDto: MarkDto) {
     //return `This action updates a #${id} model`;
     
     return await this.markRepository.updateMarkById(markDto, id);
   }
   
 
   async remove(id: any) {
    // return `This action removes a #${id} model`;
     return await this.markRepository.deleteMarkById(id);
 
   }

   async deleteMarksByIds(ids: any) {
    return await this.markRepository.deleteMarksByIds(ids);
  }
}

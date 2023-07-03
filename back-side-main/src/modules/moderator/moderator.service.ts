import { Injectable } from '@nestjs/common';
import { ModeratorRepository } from 'src/repositories/moderator.repository';
import { ModeratorDto } from './dto/moderator.dto';
import { filterModeratorDto } from './dto/filterModerator.dto';

@Injectable()
export class ModeratorService {
  constructor(private moderatorRepository: ModeratorRepository) {}

  async fetchModerators(filterModeratorDto: filterModeratorDto) {
    return this.moderatorRepository.fetchModerators(filterModeratorDto);
  }

  async fetchModeratorId(id: any) {
    return this.moderatorRepository.fetchModeratorId(id);
  }

  

  async updateModerator(id: any, moderatorDto: ModeratorDto) {
    return this.moderatorRepository.updateModerator(id, moderatorDto);
  }

  async remove(id: any) {
    // return `This action removes a #${id} ads`;
     return await this.moderatorRepository.deleteModeratorById(id);
 
   }
   
   async deleteModeratorsByIds(ids: any) {
    return await this.moderatorRepository.deleteModeratorsByIds(ids);
  }
}

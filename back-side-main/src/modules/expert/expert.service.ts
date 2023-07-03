import { Injectable } from '@nestjs/common';
import { ExpertRepository } from 'src/repositories/expert.repository';
import { filterExpertDto } from './dto/filterExpert.dto';
import * as axios from 'axios';
import { UpdateExpertDto } from './dto/update.dto';

@Injectable()
export class ExpertService {
  constructor(private expertRepository: ExpertRepository) {}

  async getPositionFromAddress(address: any) {
    try {
      const reponse = await axios.default.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAP_KEY}`
      );

      if (reponse.data.results.length === 0) {
        return undefined;
      } else {
        return reponse.data.results[0].geometry.location;
      }
    } catch (error) {}
  }

  async fetchExperts(filterExpertDto: filterExpertDto, group: any) {
    return this.expertRepository.fetchExperts(filterExpertDto, group);
  }

  async fetchExpertById(id: any) {
    return this.expertRepository.fetchExpertId(id);
  }

  async fetchTop10Expert() {
    return this.expertRepository.fetchTop10Expert();
  }

  async updateExpertsStatus(ids: any, status: number) {
    return this.expertRepository.updateExpertsStatus(ids, status);
  }

  async updateExpert(id: any, expertDto: UpdateExpertDto) {
    return this.expertRepository.updateExpert(id, expertDto);
  }

  async updateExpertsData(id: any, expertDto: any) {
    return this.expertRepository.updateExpertsData(id, expertDto);
  }

  async remove(id: any) {
    // return `This action removes a #${id} model`;
    return await this.expertRepository.deleteExpertById(id);
  }
}

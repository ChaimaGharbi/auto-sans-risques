import { Injectable } from '@nestjs/common';
import { AvisRepository } from 'src/repositories/avis.repository';
import { avisDto } from './dto/avis.dto';
import { FilterAvisDto } from './dto/filterAvis.dto';

@Injectable()
export class AvisService {
  constructor(private avisRepository: AvisRepository) {}

  async createAvis(avisDto: avisDto, images: any) {
    return await this.avisRepository.createAvis(avisDto, images);
  }

  async updateAvis(avisDto: avisDto, images: any, avisId: any) {
    return await this.avisRepository.updateAvis(avisDto, images, avisId);
  }

  async deleteAvis(avisId: any) {
    return await this.avisRepository.deleteAvis(avisId);
  }

  async fetchAvisByExpertId(expertId: any, limit: number) {
    return await this.avisRepository.fetchAvisByExpertId(expertId, limit);
  }

  async fetchAvisByClientId(clientId: any) {
    return await this.avisRepository.fetchAvisByClientId(clientId);
  }

  async fetchAvisById(id: any) {
    return await this.avisRepository.fetchAvisById(id);
  }

  async deleteAvisByIds(ids: any) {
    return await this.avisRepository.deleteAvisByIds(ids);
  }

  async deleteImageAvis(id: any) {
    return await this.avisRepository.deleteImageAvis(id);
  }

  async fetchAvisPaginate(filterAvisDto: FilterAvisDto) {
    return await this.avisRepository.fetchAvisPaginate(filterAvisDto);
  }
}

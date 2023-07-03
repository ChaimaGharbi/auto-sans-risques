import { Injectable } from '@nestjs/common';
import { ReclamationRepository } from 'src/repositories/reclamation.repository';
import { FilterReclamationDto } from './dto/filterReclamation.dto';
import { ReclamationDto } from './dto/reclamation.dto';

@Injectable()
export class ReclamationService {
  constructor(private reclamationRepository: ReclamationRepository) {}

  async createReclamation(reclamationDto: ReclamationDto) {
    return await this.reclamationRepository.createReclamation(reclamationDto);
  }

  async getReclamationById(id: any) {
    return await this.reclamationRepository.getReclamationById(id);
  }

  async updateReclamationsStatus(ids: string[], status: string) {
    return await this.reclamationRepository.updateReclamationsStatus(ids, status);
  }

  async fetchReclamations(filterReclamationDto: FilterReclamationDto) {
    return await this.reclamationRepository.fetchReclamations(filterReclamationDto);
  }
}

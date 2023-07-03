import { Injectable } from '@nestjs/common';
import { DisponibiliteRepository } from 'src/repositories/disponibilte.repository';
import { DisponibiliteDto } from './dto/disponibilite.dto';

@Injectable()
export class DisponibiliteService {
  constructor(private disponibilteRepository: DisponibiliteRepository) {}

  async createDisponibilite(disponibiliteDto: DisponibiliteDto) {
    return await this.disponibilteRepository.createDisponibilite(disponibiliteDto);
  }

  async changeReposOrRecurrent(
    id: any,
    value: {
      repos?: boolean;
      recurrent?: boolean;
    }
  ) {
    return await this.disponibilteRepository.changeReposOrRecurrent(id, value);
  }

  async deleteDisponibiliteById(id: any) {
    return await this.disponibilteRepository.deleteDisponibiliteById(id);
  }

  async fetchDisposByExpertId(id: any, fromDate?: number) {
    return await this.disponibilteRepository.fetchDisposByExpertId(id, fromDate);
  }

  async deleteDisposByExpertId(id: any) {
    return await this.disponibilteRepository.deleteDisposByExpertId(id);
  }

  async updateExpertDispo(id: any) {
    return await this.disponibilteRepository.updateExpertDispo(id);
  }
}

import { Injectable } from '@nestjs/common';
import { AssistanceRepository } from 'src/repositories/assistance.repository';
import { AssistanceDto } from './dto/assistance.dto';
import { FilterAssistanceDto } from './dto/filterAssistance.dto';

@Injectable()
export class AssistanceService {
  constructor(private assistanceRepository: AssistanceRepository) {}

  async createAssistance(assistanceDto: AssistanceDto) {
    return await this.assistanceRepository.createAssistance(assistanceDto);
  }

  async updateAssitancesStatus(ids: string[], status: string) {
    return await this.assistanceRepository.updateAssitancesStatus(ids, status);
  }

  async fetchAssistances(filterAssistanceDto: FilterAssistanceDto) {
    return await this.assistanceRepository.fetchAssistances(filterAssistanceDto);
  }
}

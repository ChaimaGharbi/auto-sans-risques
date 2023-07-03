import { Injectable } from '@nestjs/common';
import { StatsRepository } from 'src/repositories/stats.repository';

@Injectable()
export class StatsService {
  constructor(private statsRepository: StatsRepository) {}

  async getTodayWeekStats() {
    return await this.statsRepository.getTodayWeekStats();
  }

  async getMissionsStatsPerEtat() {
    return await this.statsRepository.getMissionsStatsPerEtat();
  }
}

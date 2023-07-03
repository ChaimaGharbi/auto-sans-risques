import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('/')
  async getTodayWeekStats() {
    return await this.statsService.getTodayWeekStats();
  }

  @Get('/missionsEtat')
  async getMissionsStatsPerEtat() {
    return await this.statsService.getMissionsStatsPerEtat();
  }
}

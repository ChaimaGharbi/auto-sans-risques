import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { ModeratorDto } from './dto/moderator.dto';
import { filterModeratorDto } from './dto/filterModerator.dto';

@Controller('moderator')
export class ModeratorController {
  constructor(private moderatorService: ModeratorService) {}

  @Post('/paginate')
  async fetchRapports(@Body(ValidationPipe) filterModeratorDto: filterModeratorDto) {
    return await this.moderatorService.fetchModerators(filterModeratorDto);
  }

  @Get('/:id')
  async fetchModeratorId(@Param() params) {
    return await this.moderatorService.fetchModeratorId(params.id);
  }

  @Put('/:id')
  async updateModerator(@Param() params, @Body(ValidationPipe) moderatorDto: ModeratorDto) {
    return await this.moderatorService.updateModerator(params.id, moderatorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moderatorService.deleteModeratorById(id);
  }

  @Post('/delete')
  async deleteModeratorsByIds(@Body() body) {
    return await this.moderatorService.deleteModeratorsByIds(body.ids);
  }
}

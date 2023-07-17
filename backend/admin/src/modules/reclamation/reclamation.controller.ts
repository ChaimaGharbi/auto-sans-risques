import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { FilterReclamationDto } from './dto/filterReclamation.dto';
import { ReclamationDto } from './dto/reclamation.dto';
import { ReclamationService } from './reclamation.service';

@Controller('reclamation')
export class ReclamationController {
  constructor(private reclamationService: ReclamationService) {}

  @Post('/')
  async createReclamation(@Body(ValidationPipe) reclamationDto: ReclamationDto) {
    return await this.reclamationService.createReclamation(reclamationDto);
  }

  @Get('/:id')
  async getReclamationById(@Param() params) {
    return await this.reclamationService.getReclamationById(params.id);
  }

  @Put('/state/ids')
  async updateReclamationsStatus(@Body() body) {
    return await this.reclamationService.updateReclamationsStatus(body.ids, body.etat);
  }

  @Post('/paginate')
  async fetchReclamations(@Body() filterReclamationDto: FilterReclamationDto) {
    return await this.reclamationService.fetchReclamations(filterReclamationDto);
  }
}

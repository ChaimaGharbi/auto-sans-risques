import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AvisService } from './avis.service';
import { avisDto } from './dto/avis.dto';
import { FilterAvisDto } from './dto/filterAvis.dto';

@Controller('avis')
export class AvisController {
  constructor(private avisService: AvisService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images[]'))
  async createAvis(@UploadedFiles() images, @Body(ValidationPipe) avisDto: avisDto) {
    (images);
    return await this.avisService.createAvis(avisDto, images);
  }

  @Put('/:avisId')
  @UseInterceptors(FilesInterceptor('images'))
  async updateAvis(@UploadedFiles() images, @Body(ValidationPipe) avisDto: avisDto, @Param() params) {
    return await this.avisService.updateAvis(avisDto, images, params.avisId);
  }

  @Post('/delete/ids')
  async deleteAvisByIds(@Body() body) {
    return await this.avisService.deleteAvisByIds(body.ids);
  }

  @Delete('/:avisId')
  async deleteAvis(@Param() params) {
    return await this.avisService.deleteAvis(params.avisId);
  }

  @Get('/:id')
  async fetchAvisById(@Param() params) {
    return await this.avisService.fetchAvisById(params.id);
  }

  @Get('/expert/:expertId/:limit')
  async fetchAvisByExpertId(@Param() params) {
    return await this.avisService.fetchAvisByExpertId(params.expertId, parseInt(params.limit));
  }

  @Get('/client/:clientId')
  async fetchAvisByClientId(@Param() params) {
    return await this.avisService.fetchAvisByClientId(params.clientId);
  }

  @Delete('/image/:id')
  async deleteImageAvis(@Param() params) {
    return await this.avisService.deleteImageAvis(params.id);
  }

  @Post('/paginate')
  async fetchAvisPaginate(@Body() filterAvisDto: FilterAvisDto) {
    return await this.avisService.fetchAvisPaginate(filterAvisDto);
  }
}

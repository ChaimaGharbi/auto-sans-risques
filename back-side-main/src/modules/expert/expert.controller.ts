import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { niemandsUploadImage } from 'src/utils/upload.files';
import { GetUser } from '../auth/get-user.decorator';
import { ExpertDto } from './dto/expert.dto';
import { filterExpertDto } from './dto/filterExpert.dto';
import { UpdateExpertDto } from './dto/update.dto';
import { ExpertService } from './expert.service';

@Controller('expert')
export class ExpertController {
  constructor(private expertService: ExpertService) {}

  @Post('/paginate')
  async fetchExperts(@Body(ValidationPipe) filterExpertDto: filterExpertDto, @Query() query) {
    return await this.expertService.fetchExperts(filterExpertDto, query.group);
  }

  @Get('/:id')
  async fetchExpertById(@Param() params) {
    return await this.expertService.fetchExpertById(params.id);
  }

  @Put('/')
  @UseGuards(AuthGuard())
  async updateExpertsData(@GetUser() user, @Body(ValidationPipe) expertDto: any) {
    return await this.expertService.updateExpertsData(user._id, expertDto);
  }

  @Put('/:id')
  async updateExpert(@Param() params, @Body(ValidationPipe) expertDto: UpdateExpertDto) {
    return await this.expertService.updateExpert(params.id, expertDto);
  }

  @Get('/stats/top10')
  async fetchTop10Expert() {
    return await this.expertService.fetchTop10Expert();
  }

  @Put('/status/ids')
  async updateExpertsStatus(@Body() body) {
    return await this.expertService.updateExpertsStatus(body.ids, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expertService.remove(id);
  }

  @Put('/upload/metadata')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img', maxCount: 1 },
      { name: 'cin', maxCount: 1 },
      { name: 'carteFiscale', maxCount: 1 },
      { name: 'photoAtelier', maxCount: 1 },
      { name: 'diplome', maxCount: 1 },
      { name: 'signature', maxCount: 1 }
    ])
  )
  @UseGuards(AuthGuard())
  async uploadImages(@UploadedFiles() files, @GetUser() user) {
    interface IFiles {
      img?: any;
      cin?: any;
      carteFiscale?: any;
      photoAtelier?: any;
      diplome?: any;
      signature?: any;
    }
    const filesUrls: IFiles = {};

    for (let i = 0; i < Object.keys(files).length; i++) {
      const file = files[Object.keys(files)[i]][0];

      const ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
      const fileName = `${user._id}-${Object.keys(files)[i]}`;
      const fileUrl = await niemandsUploadImage(file.buffer, fileName, ext);
      filesUrls[Object.keys(files)[i]] = fileUrl;
    }

    return this.expertService.updateExpertsData(user._id, filesUrls);
  }
}

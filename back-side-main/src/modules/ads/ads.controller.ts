import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, uploadImage } from 'src/utils/upload.files';
import { AdsService } from './ads.service';
import { AdsDto } from './dto/ads.dto';
import { filterAdsDto } from './dto/filterAds.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img', { fileFilter: imageFileFilter }))
  async create(@Body() AdsDto: AdsDto, @UploadedFile() img: Express.Multer.File) {
    let fileUrl;
    
    if (img) {
      fileUrl = await uploadImage(img);
      AdsDto.img = fileUrl;
    }
    return this.adsService.create(AdsDto);
  }

  /* @Get()
  findAll() {
    return this.adsService.findAll();
  } */

  @Post('/paginate')
  async fetchAdssPaginate(@Body(ValidationPipe) filterAdsDto: filterAdsDto) {
    return await this.adsService.findAll(filterAdsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('img', { fileFilter: imageFileFilter }))
  async update(@Param('id') id: string, @Body() AdsDto: AdsDto, @UploadedFile() img: Express.Multer.File) {
    
    let fileUrl;
    
    if (img) {
      fileUrl = await uploadImage(img);
      
      AdsDto.img = fileUrl;
    }
    return this.adsService.update(id, AdsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adsService.remove(id);
  }

  @Post('/delete')
  async deleteAdsByIds(@Body() body) {
    return await this.adsService.deleteAdsByIds(body.ids);
  }
}

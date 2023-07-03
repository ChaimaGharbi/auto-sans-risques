import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { FilterPackDto } from './dto/filterPack.dto';
import { PackDto } from './dto/pack.dto';
import { PackService } from './pack.service';

@Controller('pack')
export class PackController {
  constructor(private packService: PackService) {}

  @Get('/:id')
  async findPackById(@Param() params) {
    return await this.packService.findPackById(params.id);
  }

  @Get('/')
  async fetchPacks() {
    return await this.packService.fetchPacks();
  }

  @Post('/')
  async createPack(@Body(ValidationPipe) packDto: PackDto) {
    return await this.packService.createPack(packDto);
  }

  @Put('/:id')
  async updatePack(@Body(ValidationPipe) packDto: PackDto, @Param() params) {
    return await this.packService.updatePack(packDto, params.id);
  }

  @Delete('/:id')
  async deletePackById(@Param() params) {
    return await this.packService.deletePackById(params.id);
  }

  @Post('/delete')
  async deletePacksByIds(@Body() body) {
    return await this.packService.deletePacksByIds(body.ids);
  }

  @Post('/paginate')
  async fetchPacksPaginate(@Body() filterPackDto: FilterPackDto) {
    return await this.packService.fetchPacksPaginate(filterPackDto);
  }
}

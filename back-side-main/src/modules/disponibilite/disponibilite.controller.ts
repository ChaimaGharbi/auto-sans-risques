import { Body, Controller, Delete, Get, Query, Param, Post, Put, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { DisponibiliteService } from './disponibilite.service';
import { DisponibiliteDto } from './dto/disponibilite.dto';

@Controller('disponibilite')
export class DisponibiliteController {
  constructor(private disponibilteService: DisponibiliteService) {}

  @UseGuards(AuthGuard())
  @Post('/')
  createDisponibilite(@GetUser() user, @Body(ValidationPipe) disponibiliteDto: DisponibiliteDto) {
    const id = user._id;
    const values = {
      ...disponibiliteDto,
      expertId: id
    };
    return this.disponibilteService.createDisponibilite(values);
  }

  // @Delete('/:id')
  // async deleteDisponibiliteById(@Param() params) {
  //   return this.disponibilteService.deleteDisponibiliteById(params.id);
  // }

  @UseGuards(AuthGuard())
  @Put('/metadata')
  changeReposOrRecurrent(@GetUser() user, @Body() body) {
    const id = user._id;
    const value = body;
    return this.disponibilteService.changeReposOrRecurrent(id, value);
  }

  @UseGuards(AuthGuard())
  @Get('/')
  fetchDispos(@GetUser() user) {
    const id = user._id;

    return this.disponibilteService.fetchDisposByExpertId(id);
  }

  @UseGuards(AuthGuard())
  @Delete('/reset')
  resetDispos(@GetUser() user) {
    const id = user._id;
    return this.disponibilteService.deleteDisposByExpertId(id);
  }

  @Post('/expert/:id')
  async fetchDisposByExpertId(@Param() params, @Query() query) {
    return this.disponibilteService.fetchDisposByExpertId(params.id, parseInt(query.fromDate));
  }

  @Delete('/expert/:id')
  async deleteDisposByExpertId(@Param() params) {
    return this.disponibilteService.deleteDisposByExpertId(params.id);
  }

  @Put('/expert/:id')
  async updateExpertDispo(@Param() params) {
    return this.disponibilteService.updateExpertDispo(params.id);
  }

  @Get('/expert/:id')
  fetchExpertDispos(@Param() params) {
    const id = params.id;

    return this.disponibilteService.fetchDisposByExpertId(id);
  }
}

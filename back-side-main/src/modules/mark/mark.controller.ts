import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkDto } from './dto/mark.dto';
import { filterMarkDto } from './dto/filterMark.dto';


@Controller('marks')
export class MarkController {
  constructor(private readonly marksService: MarkService) {}

  @Post()
  create(@Body() markDto: MarkDto) {
    return this.marksService.create(markDto);
  }

  @Post('paginate')
  findAll(@Body(ValidationPipe) filterMarkDto:filterMarkDto) {
    
    return this.marksService.findAll(filterMarkDto);
  }
  @Post('model/:id')
  findAllByModelId(@Param('id') modelId: string,@Body(ValidationPipe) filterMarkDto:filterMarkDto) {
    
    return this.marksService.findAllByModelId(modelId,filterMarkDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() markDto: MarkDto) {
    return this.marksService.update(id, markDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marksService.remove(id);
  }

  @Post('/delete')
  async deleteMarksByIds(@Body() body) {
    return await this.marksService.deleteMarksByIds(body.ids);
  }

}

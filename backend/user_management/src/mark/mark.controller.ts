import {Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {MarkService} from './mark.service';
import {MarkDto} from './dto/mark.dto';
import {filterMarkDto} from './dto/filterMark.dto';


@Controller('marks')
export class MarkController {
    constructor(private readonly marksService: MarkService) {
    }

    @Post()
    create(@Body() markDto: MarkDto) {
        return this.marksService.createMark(markDto);
    }

    @Post('paginate')
    findAll(@Body(ValidationPipe) filterMarkDto: filterMarkDto) {

        return this.marksService.getMarks(filterMarkDto);
    }

    @Post('model/:id')
    findAllByModelId(@Param('id') modelId: string, @Body(ValidationPipe) filterMarkDto: filterMarkDto) {

        return this.marksService.getMarksByModelId(modelId, filterMarkDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.marksService.getMarkById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() markDto: MarkDto) {
        return this.marksService.updateMarkById(id, markDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.marksService.deleteMarkById(id);
    }

    @Post('/delete')
    async deleteMarksByIds(@Body() body) {
        return await this.marksService.deleteMarksByIds(body.ids);
    }

}

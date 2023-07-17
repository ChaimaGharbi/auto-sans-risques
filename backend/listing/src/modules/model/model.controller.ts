import {Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe} from '@nestjs/common';
import {ModelService} from './model.service';
import {ModelDto} from './dto/model.dto';
import {filterModelDto} from './dto/filterModel.dto';

@Controller('models')
export class ModelController {
    constructor(private readonly modelsService: ModelService) {
    }

    /*  @Post()
    create(@Body() modelDto: ModelDto) {
      return this.modelsService.create(modelDto);
    } */
    @Post()
    async createModel(@Body(ValidationPipe) modelDto: ModelDto) {
        return await this.modelsService.createModel(modelDto);
    }

    @Post('paginate')
    findAll(@Body(ValidationPipe) filterModelDto: filterModelDto) {
        return this.modelsService.getModels(filterModelDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.modelsService.getModelById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() modelDto: ModelDto) {

        return this.modelsService.updateModel(id, modelDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.modelsService.deleteModelById(id);
    }

    @Post('/delete')
    async deleteModelsByIds(@Body() body) {
        return await this.modelsService.deleteModelsByIds(body.ids);
    }
}

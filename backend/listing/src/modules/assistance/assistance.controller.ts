import {Body, Controller, Post, Put, ValidationPipe} from '@nestjs/common';
import {AssistanceService} from './assistance.service';
import {AssistanceDto} from './dto/assistance.dto';
import {FilterAssistanceDto} from './dto/filterAssistance.dto';

@Controller('assistance')
export class AssistanceController {
    constructor(private assistanceService: AssistanceService) {
    }

    @Post('/')
    async createAssistance(@Body(ValidationPipe) assistanceDto: AssistanceDto) {
        return await this.assistanceService.createAssistance(assistanceDto);
    }

    @Put('/state/ids')
    async updateAssitancesStatus(@Body() body) {
        return await this.assistanceService.updateAssitancesStatus(body.ids, body.etat);
    }

    @Post('/paginate')
    async fetchAssistances(@Body() filterAssistanceDto: FilterAssistanceDto) {
        return await this.assistanceService.fetchAssistances(filterAssistanceDto);
    }
}

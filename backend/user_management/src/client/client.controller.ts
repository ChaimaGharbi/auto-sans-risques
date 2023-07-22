import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {niemandsUploadImage} from 'src/shared/upload.files';
import {GetUser} from '../get-user.decorator';
import {ClientService} from './client.service';
import {filterClientDto} from './dto/filterClient.dto';

@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService) {
    }
    @Post('/paginate')
    async fetchRapports(@Body(ValidationPipe) filterClientDto: filterClientDto) {
        return await this.clientService.fetchClients(filterClientDto);
    }

    @Get('/:id')
    async fetchClientId(@Param() params) {
        return await this.clientService.fetchClientId(params.id);
    }

    @Put('/')
    @UseGuards(AuthGuard())
    async updateExpertsData(@GetUser() user, @Body(ValidationPipe) clientDto: any) {
        ('Update client data');
        return await this.clientService.updateClient(user._id, clientDto);
    }

    @Put('/status/ids')
    async updateClientsStatus(@Body() body) {
        return await this.clientService.updateClientsStatus(body.ids, body.status);
    }

    @Put('/upload/metadata')
    @UseInterceptors(FileFieldsInterceptor([{name: 'img', maxCount: 1}]))
    @UseGuards(AuthGuard())
    async uploadImages(@UploadedFiles() files, @GetUser() user) {
        ({
            ISSSSSS: user
        });

        interface IFiles {
            img?: any;
        }

        const filesUrls: IFiles = {};

        for (let i = 0; i < Object.keys(files).length; i++) {
            const file = files[Object.keys(files)[i]][0];
            const fileUrl = await niemandsUploadImage(
                file.buffer,
                file.originalname.split('.')[0],
                file.originalname.split('.')[1]
            );
            filesUrls[Object.keys(files)[i]] = fileUrl;
        }


        return this.clientService.updateClient(user._id, filesUrls);
    }
}

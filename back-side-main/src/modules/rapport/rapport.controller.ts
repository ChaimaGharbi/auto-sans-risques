import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/entities/user.roles.enum';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FilterQuestionDto } from './dto/filterQuestion.dto';
import { FilterQuestionCtgDto } from './dto/filterQuestionCtg.dto';
import { filterRapportDto } from './dto/filterRapport.dto';
import { questionDto } from './dto/question.dto';
import { questionCategoryDto } from './dto/questionCategory.dto';

import { rapportDto } from './dto/rapport.dto';
import { reponseDto } from './dto/reponse.dto';
import { reponsesCategoryDto } from './dto/reponsesCategory.dto';
import { RapportService } from './rapport.service';
import { uploadImage, niemandsUploadImage } from 'src/utils/upload.files';
import { FilesInterceptor } from '@nestjs/platform-express';

import * as path from 'path';
@Controller('rapport')
export class RapportController {
  constructor(private rapportService: RapportService) {}

  /////////Rapport Crud /////////////////
  @Post('/')
  async createRapport(@Body(ValidationPipe) rapportDto: rapportDto) {
    return await this.rapportService.createRapport(rapportDto);
  }

  @Put('/:id')
  async updateRapport(@Body(ValidationPipe) rapportDto: rapportDto, @Param() params) {
    return await this.rapportService.updateRapport(rapportDto, params.id);
  }

  @Get('/rapport/:id')
  async getRapportById(@Param() params) {
    return await this.rapportService.getRapportById(params.id);
  }

  @Put('/rapport/state/ids')
  async updateRapportsStatus(@Body() body) {
    return await this.rapportService.updateRapportsStatus(body.ids, body.etat);
  }

  @Post('/paginate')
  async fetchRapports(@Body(ValidationPipe) filterRapportDto: filterRapportDto, @Query() query) {
    return await this.rapportService.fetchRapports(filterRapportDto, query.group);
  }

  // @Roles(Role.EXPERT)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('/reponse')
  async createReponse(@Body(ValidationPipe) reponseDto: reponseDto, @Request() req) {
    return await this.rapportService.createReponse(reponseDto, req.user._id?.toString());
  }
  @Put('/reponse/:id')
  async updateReponse(@Body(ValidationPipe) reponseDto: reponseDto, @Param() params) {
    return await this.rapportService.updateReponse(reponseDto, params.id);
  }
  @Get('/reponse/:id')
  async findReponseById(@Param() params) {
    return await this.rapportService.findReponseById(params.id);
  }

  @Get('/reponse/rapport/:id')
  async findReponsesByRapportId(@Param() params) {
    return await this.rapportService.findReponsesByRapportId(params.id);
  }
  //////////////Question Category Crud///////////
  @Post('/questionCtg')
  async createQuestionCtg(@Body(ValidationPipe) questionCategoryDto: questionCategoryDto) {
    return await this.rapportService.createQuestionCtg(questionCategoryDto);
  }
  @Put('/questionCtg/:id')
  async updateQuestionCtg(@Body(ValidationPipe) questionCategoryDto: questionCategoryDto, @Param() params) {
    return await this.rapportService.updateQuestionCtg(questionCategoryDto, params.id);
  }
  @Get('/questionCtg/:id')
  async findQuestionCtgById(@Param() params) {
    return await this.rapportService.findQuestionCtgById(params.id);
  }
  @Delete('/questionCtg/:id')
  async deleteQuestionCtgById(@Param() params) {
    return await this.rapportService.deleteQuestionCtgById(params.id);
  }
  @Get('/questionCtg')
  async findAllQuestionCtg() {
    return await this.rapportService.findAllQuestionCtg();
  }
  @Post('/questionCtg/ids')
  async deleteQuestionCategories(@Body() ids: any) {
    return await this.rapportService.deleteQuestionCategories(ids);
  }
  @Post('/questionCtg/paginate')
  async fetchQuestionCategoriesPaginate(@Body() filterQuestionCtgDto: FilterQuestionCtgDto) {
    return await this.rapportService.fetchQuestionCategoriesPaginate(filterQuestionCtgDto);
  }
  //////////////Question Crud///////////
  @Post('/question')
  async createQuestion(@Body(ValidationPipe) questionDto: questionDto) {
    return await this.rapportService.createQuestion(questionDto);
  }
  @Put('/question/:id')
  async updateQuestion(@Body(ValidationPipe) questionDto: questionDto, @Param() params) {
    return await this.rapportService.updateQuestion(questionDto, params.id);
  }
  @Get('/question/:id')
  async findQuestionById(@Param() params) {
    return await this.rapportService.findQuestionById(params.id);
  }
  @Delete('/question/:id')
  async deleteQuestionById(@Param() params) {
    return await this.rapportService.deleteQuestionById(params.id);
  }
  @Get('/question')
  async findAllQuestions() {
    return await this.rapportService.findAllQuestions();
  }

  @Post('/upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>, @Param() params) {
    const urls: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const originalname = files[i].originalname;
      const basename = path.basename(originalname, path.extname(originalname));
      const ext = path.extname(originalname);
      const url = await niemandsUploadImage(files[i].buffer, basename, ext);
      urls.push(url);
    }
    return await this.rapportService.uploadImages(params.id, urls);
  }

  @Post('/question/ids')
  async deleteQuestions(@Body() ids: any) {
    return await this.rapportService.deleteQuestions(ids);
  }

  @Post('/question/paginate/:id')
  async fetchQuestionsPaginate(@Body() filterQuestionDto: FilterQuestionDto, @Param() params) {
    return await this.rapportService.fetchQuestionsPaginate(filterQuestionDto, params.id);
  }

  //ReponsesForCategory
  @Post('/reponses/:rapportId/:done')
  async createReponsesForCategory(@Body(ValidationPipe) reponsesCategoryDto: reponsesCategoryDto, @Param() params) {
    return await this.rapportService.createReponsesForCategory(reponsesCategoryDto, params.rapportId, params.done);
  }

  @Get('/reponses/:rapportId/:ctg')
  async getReponsesForCategory(@Param() params) {
    return await this.rapportService.getReponsesForCategory(params.rapportId, params.ctg);
  }
}

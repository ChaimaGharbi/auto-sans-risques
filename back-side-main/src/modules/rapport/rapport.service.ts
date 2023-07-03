import { Injectable } from '@nestjs/common';
import { RapportRepository } from 'src/repositories/rapport.repository';
import { FilterQuestionDto } from './dto/filterQuestion.dto';
import { FilterQuestionCtgDto } from './dto/filterQuestionCtg.dto';
import { filterRapportDto } from './dto/filterRapport.dto';
import { questionDto } from './dto/question.dto';
import { questionCategoryDto } from './dto/questionCategory.dto';
import { rapportDto } from './dto/rapport.dto';
import { reponseDto } from './dto/reponse.dto';
import { reponsesCategoryDto } from './dto/reponsesCategory.dto';

@Injectable()
export class RapportService {
  constructor(private rapportRepository: RapportRepository) {}

  async uploadImages(id: any, images: string[]) {
    return await this.rapportRepository.uploadImages(id, images);
  }

  async getSimpleRapportById(id: any) {
    return await this.rapportRepository.getSimpleRapportById(id);
  }

  async createRapport(rapportDto: rapportDto) {
    return await this.rapportRepository.createRapport(rapportDto);
  }

  async updateRapport(rapportDto: rapportDto, id: any) {
    return await this.rapportRepository.updateRapport(rapportDto, id);
  }

  async getRapportById(id: any) {
    return await this.rapportRepository.getRapportById(id);
  }

  async updateRapportsStatus(ids: string[], status: string) {
    return await this.rapportRepository.updateRapportsStatus(ids, status);
  }

  async fetchRapports(filterRapportDto: filterRapportDto, group: any) {
    return await this.rapportRepository.fetchRapports(filterRapportDto, group);
  }

  //////////////Reponses Crud///////////
  async createReponse(reponseDto: reponseDto, expertId: string) {
    return await this.rapportRepository.createReponse(reponseDto, expertId);
  }

  async updateReponse(reponseDto: reponseDto, id: any) {
    return await this.rapportRepository.updateReponse(reponseDto, id);
  }

  async findReponseById(id: any) {
    return await this.rapportRepository.findReponseById(id);
  }

  async findReponsesByRapportId(idRapport: any) {
    return await this.rapportRepository.findReponsesByRapportId(idRapport);
  }
  //////////Question Category Crud////////////
  async createQuestionCtg(questionCategoryDto: questionCategoryDto) {
    return await this.rapportRepository.createQuestionCategory(questionCategoryDto);
  }

  async updateQuestionCtg(questionCategoryDto: questionCategoryDto, id: any) {
    return await this.rapportRepository.updateQuestionCategory(questionCategoryDto, id);
  }

  async findQuestionCtgById(id: any) {
    return await this.rapportRepository.findQuestionCategoryById(id);
  }

  async deleteQuestionCtgById(id: any) {
    return await this.rapportRepository.deleteQuestionCategoryById(id);
  }

  async findAllQuestionCtg() {
    return await this.rapportRepository.findAllQuestionCategory();
  }

  async deleteQuestionCategories(ids: any) {
    return await this.rapportRepository.deleteQuestionCategories(ids);
  }
  async fetchQuestionCategoriesPaginate(filterQuestionCtgDto: FilterQuestionCtgDto) {
    return await this.rapportRepository.fetchQuestionCategoriesPaginate(filterQuestionCtgDto, false);
  }
  //////////Question Crud////////////
  async createQuestion(questionDto: questionDto) {
    return await this.rapportRepository.createQuestion(questionDto);
  }

  async updateQuestion(questionDto: questionDto, id: any) {
    return await this.rapportRepository.updateQuestion(questionDto, id);
  }

  async findQuestionById(id: any) {
    return await this.rapportRepository.findQuestionById(id);
  }

  async deleteQuestionById(id: any) {
    return await this.rapportRepository.deleteQuestionById(id);
  }

  async findAllQuestions() {
    return await this.rapportRepository.findAllQuestions();
  }

  async deleteQuestions(ids: any) {
    return await this.rapportRepository.deleteQuestions(ids);
  }
  async fetchQuestionsPaginate(filterQuestionDto: FilterQuestionDto, categoryId: any) {
    return await this.rapportRepository.fetchQuestionsPaginate(filterQuestionDto, categoryId);
  }

  ///Create ReponsesForCategory
  async createReponsesForCategory(responsesCategoryDto: reponsesCategoryDto, rapportId: any, done: any) {
    return await this.rapportRepository.createReponsesForCategory(responsesCategoryDto, rapportId, done);
  }

  async getReponsesForCategory(rapportId: any, ctg: any) {
    return await this.rapportRepository.getReponsesForCategory(rapportId, ctg);
  }
}

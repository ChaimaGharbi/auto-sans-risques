import { Injectable } from '@nestjs/common';
import { ArticleCategoryRepository } from 'src/repositories/article.category.repository';
import { ArticleRepository } from 'src/repositories/article.repository';
import { ArticleCategoryDto } from './dto/article.category.dto';
import { ArticleDto } from './dto/article.dto';
import { FilterArticleDto } from './dto/filterArticle.dto';
import { FilterArticleCtgDto } from './dto/filterCategory.article.dto';

@Injectable()
export class ArticleService {
  constructor(
    private articleCategoryRepository: ArticleCategoryRepository,
    private articleRepository: ArticleRepository
  ) {}

  async createArticle(articleDto: ArticleDto) {
    return await this.articleRepository.createArticle(articleDto);
  }

  async updateArticle(articleDto: ArticleDto, id: any) {
    return await this.articleRepository.updateArticle(articleDto, id);
  }

  async getAllCategories() {
    return await this.articleCategoryRepository.getAllCategories();
  }
  async findArticleById(id: any) {
    return await this.articleRepository.findArticleById(id);
  }

  async deleteArticleById(id: any) {
    return await this.articleRepository.deleteArticleById(id);
  }

  async deleteArticles(ids: any) {
    return await this.articleRepository.deleteArticles(ids);
  }

  async fetchArticles(filterArticleDto: FilterArticleDto, articleCategory: any) {
    return await this.articleRepository.fetchArticles(filterArticleDto, articleCategory);
  }

  async fetch6ArticlesByCategoriesById(id: any) {
    return await this.articleRepository.fetch6ArticlesByCategoriesById(id);
  }

  ////Articles Category

  async createArticleCategory(articleCategoryDto: ArticleCategoryDto) {
    return await this.articleCategoryRepository.createArticleCategory(articleCategoryDto);
  }

  async updateArticleCategory(articleCategoryDto: ArticleCategoryDto, id: any) {
    return await this.articleCategoryRepository.updateArticleCategory(articleCategoryDto, id);
  }

  async findArticleCategoryById(id: any) {
    return await this.articleCategoryRepository.findArticleCategoryById(id);
  }

  async deleteArticleCategoryById(id: any) {
    return await this.articleCategoryRepository.deleteArticleCategoryById(id);
  }

  async deleteCategories(ids: any) {
    return await this.articleCategoryRepository.deleteCategories(ids);
  }

  async fetch6Categories() {
    return await this.articleCategoryRepository.fetch6Categories();
  }

  async fetchArticlesCtgs(filterArticleCtgDto: FilterArticleCtgDto, group: any) {
    return await this.articleCategoryRepository.fetchArticlesCtgs(filterArticleCtgDto, group);
  }
}

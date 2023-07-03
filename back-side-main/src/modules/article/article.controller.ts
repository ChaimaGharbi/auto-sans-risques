import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, uploadImage } from 'src/utils/upload.files';
import { ArticleService } from './article.service';
import { ArticleCategoryDto } from './dto/article.category.dto';
import { ArticleDto } from './dto/article.dto';
import { FilterArticleDto } from './dto/filterArticle.dto';
import { FilterArticleCtgDto } from './dto/filterCategory.article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('/article')
  @UseInterceptors(FileInterceptor('articleImg', { fileFilter: imageFileFilter }))
  async createArticle(@Body(ValidationPipe) articleDto: ArticleDto, @UploadedFile() articleImg: Express.Multer.File) {
    let fileUrl;
    if (articleImg) {
      fileUrl = await uploadImage(articleImg);
      articleDto.articleImg = fileUrl;
    }
    return await this.articleService.createArticle(articleDto);
  }
  @Put('/article/:id')
  @UseInterceptors(FileInterceptor('articleImg', { fileFilter: imageFileFilter }))
  async updateArticle(
    @Body(ValidationPipe) articleDto: ArticleDto,
    @Param() params,
    @UploadedFile() articleImg: Express.Multer.File
  ) {
    let fileUrl;
    if (articleImg) {
      fileUrl = await uploadImage(articleImg);
      articleDto.articleImg = fileUrl;
    }
    return await this.articleService.updateArticle(articleDto, params.id);
  }
  @Get('/article/:id')
  async findArticleById(@Param() params) {
    return await this.articleService.findArticleById(params.id);
  }
  @Delete('/article/:id')
  async deleteArticleById(@Param() params) {
    return await this.articleService.deleteArticleById(params.id);
  }

  @Post('/article/deleteArticles')
  async deleteArticles(@Body() ids) {
    return await this.articleService.deleteArticles(ids);
  }

  @Get('/article/fetch6/:id')
  async fetch6ArticlesByCategoriesById(@Param() params) {
    return await this.articleService.fetch6ArticlesByCategoriesById(params.id);
  }

  @Post('/article/paginate/:id')
  async fetchArticles(@Body() filterArticleDto: FilterArticleDto, @Param() params) {
    return await this.articleService.fetchArticles(filterArticleDto, params.id);
  }

  @Post('/category')
  async createArticleCategory(@Body(ValidationPipe) articleCategoryDto: ArticleCategoryDto) {
    return await this.articleService.createArticleCategory(articleCategoryDto);
  }
  @Put('/category/:id')
  async updateArticleCategory(@Body(ValidationPipe) articleCategoryDto: ArticleCategoryDto, @Param() params) {
    return await this.articleService.updateArticleCategory(articleCategoryDto, params.id);
  }

  @Get('/category')
  async getAllCategories() {
    return await this.articleService.getAllCategories();
  }

  @Get('/category/:id')
  async findArticleCategoryById(@Param() params) {
    return await this.articleService.findArticleCategoryById(params.id);
  }
  @Delete('/category/:id')
  async deleteArticleCategoryById(@Param() params) {
    return await this.articleService.deleteArticleCategoryById(params.id);
  }

  @Post('/category/deleteCategories')
  async deleteCategories(@Body() ids) {
    return await this.articleService.deleteCategories(ids);
  }

  @Get('/category/fetch/6')
  async fetch6Categories() {
    return await this.articleService.fetch6Categories();
  }

  @Post('/category/paginate')
  async fetchArticlesCtgs(@Body() filterArticleCtgDto: FilterArticleCtgDto) {
    return await this.articleService.fetchArticlesCtgs(filterArticleCtgDto, false);
  }
}

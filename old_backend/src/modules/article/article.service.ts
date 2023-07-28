import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ArticleCategoryDto} from './dto/article.category.dto';
import {ArticleDto} from './dto/article.dto';
import {FilterArticleDto} from './dto/filterArticle.dto';
import {FilterArticleCtgDto} from './dto/filterCategory.article.dto';
import {GenericRepository} from "../../shared/generic/generic.repository";
import {Article} from "../../entities/article.entity";
import {ArticleCategory} from "../../entities/article.category.entity";
import {InjectModel} from "@nestjs/mongoose";
import {IArticleModel} from "../../entities/article.interface";
import {IArticleCategorModel} from "../../entities/article.category.interface";
import articleSort from "./article-sort";

@Injectable()
export class ArticleService {
    private readonly articleRepository: GenericRepository<Article>
    private readonly categoryRepository: GenericRepository<ArticleCategory>

    constructor(
        @InjectModel(Article.name) private readonly articleModel: IArticleModel,
        @InjectModel(ArticleCategory.name) private readonly categoryModel: IArticleCategorModel,
    ) {
        this.articleRepository = new GenericRepository(articleModel);
        this.categoryRepository = new GenericRepository(categoryModel);
    }

    async createArticle(articleDto: ArticleDto) {
        try {
            const articleSaved = await this.articleRepository.create(articleDto);
            const articleCtg = await this.categoryModel.findById(articleDto.categoryId);
            if (articleCtg) {
                articleCtg.articles.push(articleSaved);
                await articleCtg.save();
            }
            return articleSaved;
        } catch (error) {
            return error
        }
    }

  async updateArticle(articleDto: ArticleDto, id: any) {
      try {
          return await this.articleRepository.update(id, {
              title: articleDto.title,
              priority: articleDto.priority,
              content: articleDto.content,
              articleImg: articleDto.articleImg
          });
      } catch (error) {
          return new InternalServerErrorException(error);
      }
  }

  async findArticleById(id: any) {
      try {
          return await this.articleRepository.findById(id);
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
  }

  async deleteArticleById(id: any) {
      try {
          await this.articleRepository.delete(id);
          return 'Article deleted';
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
  }

    async deleteArticles(ids: any) {
        try {
            await this.articleRepository.deleteManyByIds(ids);
            return 'Articles deleted';
        } catch (error) {
            return error
        }
    }

    async fetch6ArticlesByCategoriesById(id: any) {
        try {
            return await this.articleModel.aggregate([
                {
                    $lookup: {from: 'articlecategories', localField: 'categoryId', foreignField: '_id', as: 'category'}
                },
                {
                    $addFields: {
                        _id: {$toString: '$_id'},
                        categoryId: {$toString: '$categoryId'}
                    }
                },
                {$sort: {priority: -1}},
                {$limit: 6},
                {$match: {categoryId: id}}
            ]);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async fetchArticles(filterArticleDto: FilterArticleDto, categoryId: any) {

        try {
            return await this.articleRepository.aggregate(filterArticleDto, articleSort, {categoryId: categoryId});

            /*  const articles = await this.articleModel.aggregatePaginate(myAggregate, options, null);

             return articles; */
            //LOOKUP/JOIN -- FOURTH STAGE
            // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

            /*  const articles = await this.articleModel.aggregatePaginate(myAggregate, options, null);

             return articles; */
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    ////Articles Category

    async createArticleCategory(articleCategoryDto: ArticleCategoryDto) {
        try {
            return this.categoryModel.create(articleCategoryDto);
        } catch (error) {
            return error
        }
    }

  async updateArticleCategory(articleCategoryDto: ArticleCategoryDto, id: any) {
      try {
          return await this.categoryRepository.update(id, {
              category_name: articleCategoryDto.category_name,
              priority: articleCategoryDto.priority
          });
      } catch (error) {
          return new InternalServerErrorException(error);
      }
  }

  async findArticleCategoryById(id: any) {
      try {
          return await this.categoryRepository.findById(id);
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
  }

  async deleteArticleCategoryById(id: any) {
      try {
          await this.categoryRepository.delete(id);
          return 'Article Category deleted';
      } catch (error) {
          throw new InternalServerErrorException(error);
      }
  }

    async deleteCategories(ids: any) {
        try {
            await this.categoryRepository.deleteManyByIds(ids);
            return 'Article Category deleted';
        } catch (error) {
            return error
        }
    }

    async fetch6Categories() {
        try {
            return await this.categoryModel.aggregate([{$sort: {priority: 1}}, {$limit: 6}]);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async getAllCategories() {
        try {
            return await this.categoryRepository.findAll();
        } catch (error) {
            return error
        }
    }

    async fetchArticlesCtgs(filterArticleCtgDto: FilterArticleCtgDto, group: any) {
        try {
            return await this.categoryRepository.aggregate(filterArticleCtgDto);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}

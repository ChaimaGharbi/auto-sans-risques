import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {ArticleCategoryDto} from './dto/article.category.dto';
import {ArticleDto} from './dto/article.dto';
import {FilterArticleDto} from './dto/filterArticle.dto';
import {FilterArticleCtgDto} from './dto/filterCategory.article.dto';
import {pagination} from "../../shared/pagination";
import {GenericRepository} from "../../shared/generic.repository";
import {Article} from "../../entities/article.entity";
import {ArticleCategory} from "../../entities/article.category.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IArticleModel} from "../../entities/article.interface";
import {IArticleCategorModel} from "../../entities/article.category.interface";

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
            throw new InternalServerErrorException(error);
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
            throw new InternalServerErrorException(error);
        }
    }

    async fetch6ArticlesByCategoriesById(id: any) {
        try {
            return await this.articleRepository.aggregate([
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
            const aggregate_options = [];

            const options = {
                page: filterArticleDto.pageNumber,
                limit: filterArticleDto.pageSize,
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            };
            aggregate_options.push({
                $lookup: {from: 'articlecategories', localField: 'categoryId', foreignField: '_id', as: 'category'}
            },)
            aggregate_options.push({
                $addFields: {
                    _id: {$toString: '$_id'},
                    categoryId: {$toString: '$categoryId'}
                }
            });

            //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
            // const { _id, title } = filterArticleDto.filter;
            interface IMatch {
                _id?: any;
                title?: any;
                categoryId?: any;
            }

            const match: IMatch = {};

            //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
            if (categoryId) match.categoryId = {$regex: categoryId, $options: 'i'};
            // if (_id) match._id = { $regex: _id, $options: 'i' };
            // if (title) match.title = { $regex: title, $options: 'i' };

            //filter by date


            aggregate_options.push({$match: match});

            //SORTING -- THIRD STAGE
            const sortOrderU = filterArticleDto.sortOrder === 'desc' ? -1 : 1;
            if (filterArticleDto.sortField) {
                aggregate_options.push({$sort: {[filterArticleDto.sortField]: sortOrderU}});
            }
            const myAgregate = pagination(aggregate_options, options)
            //LOOKUP/JOIN -- FOURTH STAGE
            // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

            // Set up the aggregation
            const myAggregate = await this.articleModel.aggregate(myAgregate);

            console.log('myAggregate articles', myAggregate);
            return myAggregate[0]
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
            throw new InternalServerErrorException(error);
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
            throw new InternalServerErrorException(error);
        }
    }

    async fetch6Categories() {
        try {
            return await this.categoryRepository.aggregate([{$sort: {priority: 1}}, {$limit: 6}]);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async getAllCategories() {
        try {
            return await this.categoryRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async fetchArticlesCtgs(filterArticleCtgDto: FilterArticleCtgDto, group: any) {
        try {
            const aggregate_options = [];

            const options = {
                page: filterArticleCtgDto.pageNumber,
                limit: filterArticleCtgDto.pageSize,
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            };

            aggregate_options.push({
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            });

            //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
            const {_id, category_name} = filterArticleCtgDto.filter;

            interface IMatch {
                _id?: any;
                category_name?: any;
            }

            const match: IMatch = {};

            //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
            if (_id) match._id = {$regex: _id, $options: 'i'};
            if (category_name) match.category_name = {$regex: category_name, $options: 'i'};

            //filter by date


            aggregate_options.push({$match: match});

            //SORTING -- THIRD STAGE
            /* const sortOrderU = filterArticleCtgDto.sortOrder === 'desc' ? -1 : 1;
            if (filterArticleCtgDto.sortField === 'priority') {
              aggregate_options.push({ $sort: { priority: sortOrderU } });
            } else {
              aggregate_options.push({ $sort: { created_At: sortOrderU } });
            } */

            //SORTING -- THIRD STAGE
            const sortOrderU = filterArticleCtgDto.sortOrder === 'desc' ? -1 : 1;
            if (filterArticleCtgDto.sortField) {
                aggregate_options.push({$sort: {[filterArticleCtgDto.sortField]: sortOrderU}});
            }
            const myAgregate = pagination(aggregate_options, options);

            //LOOKUP/JOIN -- FOURTH STAGE
            // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

            // Set up the aggregation
            const articleCtgs = await this.categoryRepository.aggregate(myAgregate);

            /*  const articleCtgs = await this.articleCategoryModel.aggregatePaginate(myAggregate, options, null); */

            return articleCtgs[0];
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}

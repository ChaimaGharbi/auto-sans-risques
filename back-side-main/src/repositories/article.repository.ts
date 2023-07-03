import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleCategory } from 'src/entities/article.category.entity';
import { IArticleCategorModel } from 'src/entities/article.category.interface';
import { Article } from 'src/entities/article.entity';
import { IArticleModel } from 'src/entities/article.interface';
import { ArticleCategoryDto } from 'src/modules/article/dto/article.category.dto';
import { ArticleDto } from 'src/modules/article/dto/article.dto';
import { FilterArticleDto } from 'src/modules/article/dto/filterArticle.dto';
import { FilterArticleCtgDto } from 'src/modules/article/dto/filterCategory.article.dto';
import { pagination } from 'src/shared/pagination';

export class ArticleRepository {
  constructor(
    @InjectModel(ArticleCategory.name) private articleCategoryModel: IArticleCategorModel,
    @InjectModel(Article.name) private articleModel: IArticleModel
  ) {}

  async createArticle(articleDto: ArticleDto) {
    try {
      const sess = await this.articleCategoryModel.db.startSession();
      sess.startTransaction();
      const article = new this.articleModel(articleDto);
      const articleSaved = await article.save({ session: sess });
      const articleCtg = await this.articleCategoryModel.findById(articleDto.categoryId, null, { session: sess });
      if (articleCtg) {
        articleCtg.articles.push(articleSaved);
        await articleCtg.save({ session: sess });
      }
      await sess.commitTransaction();
      return article;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateArticle(articleDto: ArticleDto, id: any) {
    try {
      const article = await this.articleModel.findById(id);
      if (!article) {
        return new NotFoundException('Article not found');
      }
      article.title = articleDto.title;
      article.priority = articleDto.priority;
      article.content = articleDto.content;
      article.articleImg = articleDto.articleImg;

      await article.save();
      return article;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findArticleById(id: any) {
    try {
      const article = await this.articleModel.findById(id);
      if (!article) {
        return new NotFoundException('Article not found');
      }
      return article;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteArticleById(id: any) {
    try {
      const article = await this.articleModel.findByIdAndDelete(id);
      if (!article) {
        return new NotFoundException('Article not found');
      }
      return 'Article deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteArticles(ids: any) {
    try {
      await this.articleModel.deleteMany({ _id: { $in: ids.ids } });
      return 'Articles deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetch6ArticlesByCategoriesById(id: any) {
    try {
      const articles = await this.articleModel.aggregate([
        {
          $lookup: { from: 'articlecategories', localField: 'categoryId', foreignField: '_id', as: 'category' }
        },
        {
          $addFields: {
            _id: { $toString: '$_id' },
            categoryId: { $toString: '$categoryId' }
          }
        },
        { $sort: { priority: -1 } },
        { $limit: 6 },
        { $match: { categoryId: id } }
      ]);
      return articles;
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
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };
      aggregate_options.push({
        $lookup: { from: 'articlecategories', localField: 'categoryId', foreignField: '_id', as: 'category' }
      },)
      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' },
          categoryId: { $toString: '$categoryId' }
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
      if (categoryId) match.categoryId = { $regex: categoryId, $options: 'i' };
     // if (_id) match._id = { $regex: _id, $options: 'i' };
     // if (title) match.title = { $regex: title, $options: 'i' };

      //filter by date
      

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterArticleDto.sortOrder === 'desc' ? -1 : 1;
      if (filterArticleDto.sortField) {
        aggregate_options.push({ $sort: { [filterArticleDto.sortField]: sortOrderU } });
      } 
      const myAgregate = pagination(aggregate_options,options)
      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = await this.articleModel.aggregate(myAgregate);
      
      console.log('myAggregate articles',myAggregate);
      return myAggregate[0]
     /*  const articles = await this.articleModel.aggregatePaginate(myAggregate, options, null);
      
      return articles; */
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

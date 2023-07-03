import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleCategory } from 'src/entities/article.category.entity';
import { IArticleCategorModel } from 'src/entities/article.category.interface';
import { ArticleCategoryDto } from 'src/modules/article/dto/article.category.dto';
import { FilterArticleCtgDto } from 'src/modules/article/dto/filterCategory.article.dto';
import { pagination } from 'src/shared/pagination';

export class ArticleCategoryRepository {
  constructor(@InjectModel(ArticleCategory.name) private articleCategoryModel: IArticleCategorModel) {}

  async createArticleCategory(articleCategoryDto: ArticleCategoryDto) {
    try {
      const articleCtg = new this.articleCategoryModel(articleCategoryDto);
      await articleCtg.save();
      return articleCtg;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateArticleCategory(articleCategoryDto: ArticleCategoryDto, id: any) {
    try {
      const articleCtg = await this.articleCategoryModel.findById(id);
      if (!articleCtg) {
        return new NotFoundException('Article Category not found');
      }
      articleCtg.category_name = articleCategoryDto.category_name;
      articleCtg.priority = articleCategoryDto.priority;

      await articleCtg.save();
      return articleCtg;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findArticleCategoryById(id: any) {
    try {
      const articleCtg = await this.articleCategoryModel.findById(id);
      if (!articleCtg) {
        return new NotFoundException('Article Category not found');
      }
      return articleCtg;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteArticleCategoryById(id: any) {
    try {
      const articleCtg = await this.articleCategoryModel.findByIdAndDelete(id);
      if (!articleCtg) {
        return new NotFoundException('Article Category not found');
      }
      return 'Article Category deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteCategories(ids: any) {
    try {
      await this.articleCategoryModel.deleteMany({ _id: { $in: ids.ids } });
      return 'Article Category deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetch6Categories() {
    try {
      const ctgs = await this.articleCategoryModel.aggregate([{ $sort: { priority: 1 } }, { $limit: 6 }]);
      
      return ctgs;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async getAllCategories() {
    try {
      const articleCtgs = await this.articleCategoryModel.find();
      return articleCtgs;
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
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, category_name } = filterArticleCtgDto.filter;
      interface IMatch {
        _id?: any;
        category_name?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (category_name) match.category_name = { $regex: category_name, $options: 'i' };

      //filter by date
      

      aggregate_options.push({ $match: match });

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
        aggregate_options.push({ $sort: { [filterArticleCtgDto.sortField]: sortOrderU } });
      }
      const myAgregate = pagination(aggregate_options, options);

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const articleCtgs = await this.articleCategoryModel.aggregate(myAgregate);

      /*  const articleCtgs = await this.articleCategoryModel.aggregatePaginate(myAggregate, options, null); */
      
      return articleCtgs[0];
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

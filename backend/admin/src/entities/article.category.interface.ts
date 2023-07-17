import {Model} from 'mongoose';
import {ArticleCategory} from './article.category.entity';

export interface IArticleCategorModel extends Model<ArticleCategory> {
  aggregatePaginate: any;
}

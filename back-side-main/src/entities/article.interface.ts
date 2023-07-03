import { Model } from 'mongoose';
import { Article } from './article.entity';

export interface IArticleModel extends Model<Article> {
  aggregatePaginate: any;
}

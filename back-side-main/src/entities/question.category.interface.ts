import { Model } from 'mongoose';
import { QuestionCategory } from './quetion.category.entity';


export interface IQuestionCategoryModel extends Model<QuestionCategory> {
  aggregatePaginate: any;
}
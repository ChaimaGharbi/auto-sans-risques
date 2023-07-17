import {Model} from 'mongoose';
import {Question} from './question.entity';

export interface IQuestionModel extends Model<Question> {
    aggregatePaginate: any;
}

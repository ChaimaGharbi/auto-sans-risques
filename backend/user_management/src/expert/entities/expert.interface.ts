import {Model} from 'mongoose';
import {Expert} from './expert.entity';

export interface IExpertModel extends Model<Expert> {
    aggregatePaginate: any;
}

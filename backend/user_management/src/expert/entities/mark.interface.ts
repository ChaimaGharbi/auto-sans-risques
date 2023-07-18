import {Model} from 'mongoose';
import {Mark} from './mark.entity';

export interface IMarkModel extends Model<Mark> {
    aggregatePaginate: any;
}
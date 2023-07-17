import {Model} from 'mongoose';
import {Ads} from './ads.entity';

export interface IAdsModel extends Model<Ads> {
    aggregatePaginate: any;
}
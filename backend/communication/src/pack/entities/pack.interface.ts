import {Model} from 'mongoose';
import {Pack} from './pack.entity';

export interface IPackModel extends Model<Pack> {
    aggregatePaginate: any;
}

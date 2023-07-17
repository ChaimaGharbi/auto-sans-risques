import {Model} from 'mongoose';
import {Avis} from './avis.entity';

export interface IAvisModel extends Model<Avis> {
    aggregatePaginate: any;
}
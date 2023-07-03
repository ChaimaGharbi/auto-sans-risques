import { Model } from 'mongoose';
import { Rapport } from './rapport.entity';

export interface IRapportModel extends Model<Rapport> {
  aggregatePaginate: any;
}

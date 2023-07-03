import { Model } from 'mongoose';
import { Assistance } from './assistance.entity';

export interface IAssistanceModel extends Model<Assistance> {
  aggregatePaginate: any;
}
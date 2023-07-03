import { Model } from 'mongoose';
import { Client } from './client.entity';

export interface IClientModel extends Model<Client> {
  aggregatePaginate: any;
}

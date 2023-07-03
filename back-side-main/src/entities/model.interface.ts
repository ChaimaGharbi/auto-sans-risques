import { Model } from 'mongoose';
import { Model as ModelCar } from './model.entity';

export interface IModelCar extends Model<ModelCar> {
  aggregatePaginate: any;
}
import {Model} from 'mongoose';
import {Payment} from './payment.entity';

export interface IPaymentModel extends Model<Payment> {
  aggregatePaginate: any;
}

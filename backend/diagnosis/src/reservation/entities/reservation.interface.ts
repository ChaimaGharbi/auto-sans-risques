import {Model} from 'mongoose';
import {Reservation} from './reservation.entity';

export interface IReservationModel extends Model<Reservation> {
    aggregatePaginate: any;
}

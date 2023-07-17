import {Model} from 'mongoose';
import {Reclamation} from './reclamation.entity';

export interface IReclamationModel extends Model<Reclamation> {
    aggregatePaginate: any;
}

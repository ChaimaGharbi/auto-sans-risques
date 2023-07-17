import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Types, Document} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {ReclamationStatus} from './reclamation.status.enum';

@Schema()
export class Reclamation extends Document {
    @Prop({type: Types.ObjectId, ref: 'Reservation'})
    reservationId: any;

    @Prop({type: Types.ObjectId, ref: 'Expert'})
    expertId: any;

    @Prop({type: Types.ObjectId, ref: 'Client'})
    clientId: any;

    @Prop()
    fullName: string;

    @Prop()
    tel: string;

    @Prop()
    email: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({default: ReclamationStatus.EN_ATTENTE})
    etat: string;

    @Prop({default: Date.now})
    date: Date;

    @Prop()
    solvedAt: Date;
}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);

ReclamationSchema.pre('save', function (next) {
    // this._id is a string
    this.set('reservationId', Types.ObjectId(this.reservationId), {strict: false});
    this.set('clientId', Types.ObjectId(this.clientId), {strict: false});
    this.set('expertId', Types.ObjectId(this.expertId), {strict: false});

    next();
    // this._id is still a string
});

ReclamationSchema.plugin(aggregatePaginate);

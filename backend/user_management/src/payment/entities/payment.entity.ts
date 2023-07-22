import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {PaymentStatus} from './Payment.status.enum';

@Schema()
export class Payment extends Document {
    @Prop({type: Types.ObjectId, ref: 'Expert'})
    expertId: any;

    @Prop({type: Types.ObjectId, ref: 'Facture'})
    factureId: any;

    @Prop()
    payId: number;

    @Prop({default: 1000000})
    paymentId: number;

    @Prop()
    amount: number;

    @Prop({default: PaymentStatus.EN_ATTENTE})
    etat: PaymentStatus;

    @Prop()
    nb_missions: number;

    @Prop({default: Date.now})
    date: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.pre('save', function (next) {
    // this._id is a string
    this.set('expertId', Types.ObjectId(this.expertId), {strict: false});
    next();
    // this._id is still a string
});

PaymentSchema.plugin(aggregatePaginate);

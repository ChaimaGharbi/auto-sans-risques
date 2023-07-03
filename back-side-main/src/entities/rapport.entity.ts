import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Reponse } from './reponse.entity';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class Rapport extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: any;

  @Prop({ type: Types.ObjectId, ref: 'Expert' })
  expertId: any;

  @Prop({ type: Types.ObjectId, ref: 'Reservation' })
  reservationId: any;

  @Prop()
  numIdentify: number;

  @Prop()
  content: string;

  @Prop()
  link: string;

  @Prop({ default: 'en attente' })
  etat: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reponse' }] })
  reponses: Reponse[];

  @Prop()
  images: string[];
}

export const RapportSchema = SchemaFactory.createForClass(Rapport);

RapportSchema.pre('save', function (next) {
  // this._id is a string
  this.set('clientId', Types.ObjectId(this.clientId), { strict: false });
  this.set('expertId', Types.ObjectId(this.expertId), { strict: false });
  this.set('reservationId', Types.ObjectId(this.reservationId), { strict: false });
  next();
  // this._id is still a string
});

RapportSchema.plugin(aggregatePaginate);

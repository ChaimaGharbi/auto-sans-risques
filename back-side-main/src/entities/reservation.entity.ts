import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Client } from './client.entity';
import { Expert } from './expert.entity';
import { ReservationStatus } from './reservation.status.enum';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class Reservation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: any;

  @Prop({ type: Types.ObjectId, ref: 'Expert' })
  expertId: any;

  @Prop({ type: Types.ObjectId, ref: 'Rapport' })
  rapportId: any;

  @Prop()
  fullName: string;

  @Prop()
  phone: string;

  @Prop()
  typeCar: string;

  @Prop()
  reason: string;

  @Prop()
  link: string;

  @Prop()
  date: Date;

  @Prop({ default: ReservationStatus.EN_ATTENTE })
  status: ReservationStatus;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

ReservationSchema.pre('save', function (next) {
  // this._id is a string
  this.set('clientId', Types.ObjectId(this.clientId), { strict: false });
  this.set('expertId', Types.ObjectId(this.expertId), { strict: false });
  //this.set('rapportId', Types.ObjectId(this.rapportId), { strict: false });
  next();
  // this._id is still a string
});

ReservationSchema.plugin(aggregatePaginate);

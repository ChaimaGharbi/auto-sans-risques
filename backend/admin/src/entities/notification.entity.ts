import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop()
  message: string;

  @Prop({ default: false })
  is_read: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Client' || 'Expert' })
  senderId: any;

  @Prop({ type: Types.ObjectId, ref: 'Client' || 'Expert' })
  receiverId: any;

  @Prop({ type: Types.ObjectId, ref: 'Reservation' })
  reservationId: any;
  /*  @Prop({ default: Date.now })
  createdAt: Date; */
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.pre('save', function (next) {
  // this._id is a string
  this.set('senderId', Types.ObjectId(this.senderId), { strict: false });
  this.set('receiverId', Types.ObjectId(this.receiverId), { strict: false });
  this.set('reservationId', Types.ObjectId(this.reservationId), { strict: false });
  next();
});
NotificationSchema.plugin(aggregatePaginate);

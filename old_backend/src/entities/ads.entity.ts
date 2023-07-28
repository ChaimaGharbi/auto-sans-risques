import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema({ timestamps: true })
export class Ads extends Document {
  @Prop()
  title: string;
  @Prop()
  body: string;
  @Prop()
  img: string;
  @Prop()
  url: string;
  @Prop()
  typeUser: string;
  @Prop({ default: false })
  isActive: boolean;
  /*  @Prop({ type: Types.ObjectId,ref: 'Client' || 'Expert' })
  userId: any; */
  @Prop()
  lng: number;
  @Prop()
  lat: number;
}
export const AdsSchema = SchemaFactory.createForClass(Ads);
/* AdsSchema.pre('save', function (next) {
  // this._id is a string
  this.set('userId', Types.ObjectId(this.userId), { strict: false });
  next();
}); */
AdsSchema.plugin(aggregatePaginate);

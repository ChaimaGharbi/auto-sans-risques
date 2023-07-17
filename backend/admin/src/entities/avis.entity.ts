import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {ImageAvis} from './image_avis.entity';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';


@Schema()
export class Avis extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: any;

  @Prop({ type: Types.ObjectId, ref: 'Expert' })
  expertId: any;

  @Prop()
  commentaire: string;

  @Prop()
  note: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ImageAvis' }] })
  images: ImageAvis[];
}

export const AvisSchema = SchemaFactory.createForClass(Avis);

AvisSchema.pre('save', function (next) {
  // this._id is a string
  this.set('clientId', Types.ObjectId(this.clientId), { strict: false });
  this.set('expertId', Types.ObjectId(this.expertId), { strict: false });
  next();
  // this._id is still a string
});

AvisSchema.plugin(aggregatePaginate);

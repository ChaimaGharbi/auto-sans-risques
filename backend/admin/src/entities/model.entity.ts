import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {Mark} from './mark.entity';

@Schema({ timestamps: true })
export class Model extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Mark.name }] })
  marks?: any;

  /*  @Prop({
    type:[{quantity:{type:Number}, product:{type:Types.ObjectId}}]
  })
  products: { quantity: number; product: Mark }[]; */
}

export const ModelSchema = SchemaFactory.createForClass(Model);

/* ModelSchema.pre('save', function (next) {
  this.set('marks', [Types.ObjectId(this.marks)], { strict: false });
  next();
}); */
ModelSchema.plugin(aggregatePaginate);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class Article extends Document {

  @Prop({ type: Types.ObjectId, ref: 'ArticleCategory' })
  categoryId: any;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  created_At: Date;

  @Prop()
  priority: number;

  @Prop()
  articleImg: string;

  @Prop()
  nb_views: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

ArticleSchema.pre('save', function (next) {
  // this._id is a string
  this.set('categoryId', Types.ObjectId(this.categoryId), { strict: false });
  next();
  // this._id is still a string
});


ArticleSchema.plugin(aggregatePaginate);

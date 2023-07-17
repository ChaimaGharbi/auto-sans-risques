import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Article} from './article.entity';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class ArticleCategory extends Document {
  @Prop()
  category_name: string;

  @Prop()
  priority: number;

  @Prop({ default: Date.now })
  created_At: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Article' }] })
  articles: Article[];
}

export const ArticleCategorySchema = SchemaFactory.createForClass(ArticleCategory);

ArticleCategorySchema.plugin(aggregatePaginate);

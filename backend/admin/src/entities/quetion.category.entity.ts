import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {Question} from './question.entity';

@Schema()
export class QuestionCategory extends Document {
  @Prop()
  category_name: string;

  @Prop()
  priority: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Question[];
}

export const QuestionCategorySchema = SchemaFactory.createForClass(QuestionCategory);

QuestionCategorySchema.plugin(aggregatePaginate);

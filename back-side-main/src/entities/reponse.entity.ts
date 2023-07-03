import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Reponse extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Question' })
  questionId: any;

  @Prop()
  category_name: string;

  @Prop()
  reponse: string;

  @Prop()
  comment: string;

  @Prop({ default: 'black' })
  color: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Rapport' })
  rapportId: any;

  @Prop({ type: Types.ObjectId, ref: 'QuestionCategory' })
  categoryId: any;
}

export const ReponseSchema = SchemaFactory.createForClass(Reponse);

ReponseSchema.pre('save', function (next) {
  // this._id is a string
  this.set('categoryId', Types.ObjectId(this.categoryId), { strict: false });
  this.set('rapportId', Types.ObjectId(this.rapportId), { strict: false });
  this.set('questionId', Types.ObjectId(this.questionId), { strict: false });
  next();
  // this._id is still a string
});

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { AssistanceStatus } from './assistance.enum';

@Schema()
export class Assistance extends Document {
  @Prop()
  tel: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ default: AssistanceStatus.EN_ATTENTE })
  etat: string;
}

export const AssistanceSchema = SchemaFactory.createForClass(Assistance);

AssistanceSchema.plugin(aggregatePaginate);

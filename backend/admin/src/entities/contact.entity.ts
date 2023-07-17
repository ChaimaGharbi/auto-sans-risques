import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class Contact extends Document {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  state: string;

  @Prop()
  subject: string;

  @Prop()
  message: string;

  @Prop({ default: Date.now })
  created_At: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.plugin(aggregatePaginate);

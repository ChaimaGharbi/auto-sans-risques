import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {User} from './user.entity';

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  token: string;

  @Prop({ default: Date.now, expires: 43200, required: true })
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

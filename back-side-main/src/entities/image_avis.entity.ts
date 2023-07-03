import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Avis } from './avis.entity';

@Schema()
export class ImageAvis extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Avis' })
  avisId: Types.ObjectId;
  @Prop()
  imageUrl: string;
}

export const ImageAvisSchema = SchemaFactory.createForClass(ImageAvis);

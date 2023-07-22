import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Facture extends Document {
    @Prop()
    payId: number;

    @Prop()
    link: string;

    @Prop()
    etat: string;

    @Prop({default: Date.now})
    date: Date;
}

export const FactureSchema = SchemaFactory.createForClass(Facture);

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class Pack extends Document {
    @Prop()
    nb_missions: number;

    @Prop()
    prix: number;

    @Prop()
    priority: number;
}

export const PackSchema = SchemaFactory.createForClass(Pack);

PackSchema.plugin(aggregatePaginate);

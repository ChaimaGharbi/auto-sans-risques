import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema()
export class Question extends Document {
    @Prop({type: Types.ObjectId, ref: 'QuestionCategory'})
    categoryId: any;

    @Prop()
    question: string;

    @Prop()
    note: number;

    @Prop()
    comment: string;

    @Prop()
    typeInput: string;

    @Prop()
    choices: string[];

    @Prop()
    colors: string[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.plugin(aggregatePaginate);

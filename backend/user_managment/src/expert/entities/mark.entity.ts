import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Types, Document} from 'mongoose';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema({timestamps: true})
export class Mark extends Document {
    @Prop()
    name: string;

    @Prop({type: Types.ObjectId, ref: 'Model'})
    modelId: any;
}

export const MarkSchema = SchemaFactory.createForClass(Mark);

MarkSchema.pre('save', function (next) {
    // this._id is a string
    this.set('modelId', Types.ObjectId(this.modelId), {strict: false});
    next();
});
MarkSchema.plugin(aggregatePaginate);

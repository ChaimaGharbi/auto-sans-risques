import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

@Schema()
export class Disponibilite extends Document {
    @Prop({type: Types.ObjectId, ref: 'Expert'})
    expertId: any;

    @Prop()
    dayNumber: number;

    @Prop()
    date: string;

    @Prop()
    startHour: string;

    @Prop()
    endHour: string;

    @Prop()
    start: number;

    @Prop()
    end: number;
}

export const DisponibiliteSchema = SchemaFactory.createForClass(Disponibilite);

DisponibiliteSchema.pre('save', function (next) {
    // this._id is a string
    this.set('expertId', Types.ObjectId(this.expertId), {strict: false});
    next();
    // this._id is still a string
});

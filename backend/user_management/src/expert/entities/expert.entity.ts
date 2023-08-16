import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../auth/entities/user.entity';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

import * as crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import {Types} from 'mongoose';

@Schema({timestamps: true})
export class Expert extends User {
    @Prop()
    address: string;

    @Prop()
    specialite: string[];

    @Prop({type: [{type: Types.ObjectId, ref: 'Model'}], default: []})
    specialitiesModels?: [];

    @Prop({type: [{type: Types.ObjectId, ref: 'Mark'}], default: []})
    specialitiesMarks?: [];

    @Prop()
    tel: string;

    @Prop({default: 0})
    status: number;

    @Prop()
    img: string;

    @Prop()
    ville: string;

    @Prop()
    propos: string;

    @Prop()
    certif: string[];

    @Prop()
    cin: string;

    @Prop()
    carteFiscale: string;

    @Prop()
    photoAtelier: string;

    @Prop()
    diplome: string;

    @Prop()
    signature: string;

    @Prop({default: 0})
    nb_missions: number;

    @Prop({default: 0})
    credit: number;

    @Prop()
    lng: number;

    @Prop()
    lat: number;

    @Prop()
    image: string;

    @Prop()
    note: number;

    @Prop()
    dispos: number[];

    @Prop({default: false})
    repos: boolean;

    @Prop({default: false})
    recurrentAvailability: boolean;
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);

ExpertSchema.plugin(aggregatePaginate);

ExpertSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
};

ExpertSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = new Date(Date.now() + 3600000); //expires in an hour
};

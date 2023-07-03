import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';

@Schema({ timestamps: true })
export class Client extends User {
  @Prop()
  adresse: string;

  @Prop()
  tel: string;

  @Prop()
  ville: string;

  @Prop()
  gouv: string;

  @Prop()
  lng: number;

  @Prop()
  img: string;

  @Prop()
  lat: number;

  @Prop()
  image: string;

  @Prop({ default: 1 })
  status: number;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

ClientSchema.plugin(aggregatePaginate);

ClientSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);

  return hash === this.password;
};

ClientSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = new Date(Date.now() + 3600000); //expires in an hour
};

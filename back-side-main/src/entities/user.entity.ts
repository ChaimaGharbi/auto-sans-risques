/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import { Role } from './user.roles.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  role: Role;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ required: false })
  resetPasswordToken: string;

  @Prop({ required: false })
  resetPasswordExpires: Date;

  validatePassword: Function;

  generatePasswordReset: Function;

  generateVerificationToken: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  

  return hash === this.password;
};

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = new Date(Date.now() + 3600000); //expires in an hour
};

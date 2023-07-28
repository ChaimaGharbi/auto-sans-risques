import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from './user.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Admin extends User {
  @Prop()
  tel: string;
  
  /*  @Prop()
  accessList?: any; */
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};
AdminSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = new Date(Date.now() + 3600000); //expires in an hour
};

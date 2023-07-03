import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Moderator extends User {
  @Prop()
  tel: string;
  @Prop({
    type:{
      menus:{
        client:{type:Boolean},
        experts:{type:Boolean},
        rapports:{type:Boolean},
        reclama:{type:Boolean},
        assist:{type:Boolean},
        missions:{type:Boolean},
        avis:{type:Boolean}
      },
      configs:{
        marks:{type:Boolean},
        articles:{type:Boolean},
        packs:{type:Boolean},
        ads:{type:Boolean},
        rapport:{type:Boolean},
      }
    }
  })
  allows: { 
    menus:{
      client:boolean,
      experts:boolean,
      rapports:boolean,
      reclama:boolean,
      assist:boolean,
      missions:boolean,
      avis:boolean
    },
    configs:{
      marks:boolean,
      articles:boolean,
      packs:boolean,
      ads:boolean,
      rapport:boolean,
    } 
  };
 /*  @Prop()
  accessList?: any; */
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);

ModeratorSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  

  return hash === this.password;
};

ModeratorSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = new Date(Date.now() + 3600000); //expires in an hour
};

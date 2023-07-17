import {Type} from 'class-transformer';
import {IsString} from 'class-validator';

export class Allow {
    menus:{
      client:boolean,
      experts:boolean,
      rapports:boolean,
      reclama:boolean,
      assist:boolean,
      missions:boolean,
      avis:boolean
    };
    configs:{
      marks:boolean,
      articles:boolean,
      packs:boolean,
      ads:boolean,
      rapport:boolean,
    } 
}
export class ModeratorDto {
 
  @IsString()
  fullName: string;

  @IsString()
  tel: string;

  @Type(() => Allow)
  allows: Allow;

  isVerified: any;
}

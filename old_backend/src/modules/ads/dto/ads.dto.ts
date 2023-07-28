import {IsBoolean, IsNumber, IsString, MaxLength, MinLength} from 'class-validator';


export class AdsDto {

    @IsString()
    title?:  string;

    @IsString()
    body?:  string;

    @IsString()
    img?:  string;
    
    @IsString()
    url?:  string;

    @IsString()
    typeUser?:  string;

   /*  @IsMongoId()
    userId?:  any; */

    @IsBoolean()
    isActive?:  boolean;

    @IsNumber()
    lng?: number;

    @IsNumber()
    lat?: number;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    adresse: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    ville: string;
}

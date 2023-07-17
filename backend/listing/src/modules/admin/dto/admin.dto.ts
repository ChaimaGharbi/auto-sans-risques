import {Type} from 'class-transformer';
import {IsNumber, IsString, Max, Min} from 'class-validator';

export class AdminDto {
    @IsString()
    fullName: string;
    @IsString()
    tel: string;
    isVerified: any;
}

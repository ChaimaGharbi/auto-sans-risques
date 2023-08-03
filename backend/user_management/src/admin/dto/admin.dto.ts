import {IsString} from 'class-validator';

export class AdminDto {
    @IsString()
    fullName: string;
    @IsString()
    tel: string;
    isVerified: any;
}

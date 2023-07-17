import {Type} from 'class-transformer';
import {IsArray, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength} from 'class-validator';
import {Types} from 'mongoose';
import {Role} from 'src/entities/user.roles.enum';

export class SignupCredentialsDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    fullName: string;
    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    specialitiesModels?: [];
    @IsOptional()
    lng: number;
    @IsOptional()
    lat: number;
    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    specialitiesMarks?: [];
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    tel: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    password: string;
    @IsString()
    @IsEnum(Role)
    role: Role;
}

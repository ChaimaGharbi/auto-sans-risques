import { Type } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength, IsOptional, IsArray, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { Role } from 'src/entities/user.roles.enum';

export class UpdateExpertCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  adresse: string;

  lng: number;

  lat: number;

  @IsOptional()
  @IsArray()
  @Type(() => Types.ObjectId)
  specialitiesModels?: [];

  @IsOptional()
  @IsArray()
  @Type(() => Types.ObjectId)
  specialitiesMarks?: [];

  certif: string[];

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  tel: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  ville: string;

  propos: string;

  // @IsEnum(Role)
  role: Role;
}

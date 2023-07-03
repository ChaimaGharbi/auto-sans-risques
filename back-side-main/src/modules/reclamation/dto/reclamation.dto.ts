import { IsEmail, IsMongoId, IsString } from 'class-validator';

export class ReclamationDto {
  @IsString()
  fullName: string;

  @IsString()
  tel: string;

  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsMongoId()
  clientId: any;

  @IsMongoId()
  expertId: any;

  @IsMongoId()
  reservationId: any;
}

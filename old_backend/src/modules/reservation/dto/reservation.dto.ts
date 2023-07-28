import {IsMongoId, IsString, MaxLength, MinLength} from 'class-validator';

export class reservationDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  fullName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(8)
  phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  reason: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  typeCar: string;

  date: Date;

  @IsMongoId()
  clientId: any;

  @IsMongoId()
  expertId: any;
}

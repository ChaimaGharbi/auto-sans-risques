import { IsString, MaxLength, MinLength } from 'class-validator';

export class ContactDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  phone: string;

  @IsString()
  state: string;

  @IsString()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  name: string;
}

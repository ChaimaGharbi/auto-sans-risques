import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  password: string;


}

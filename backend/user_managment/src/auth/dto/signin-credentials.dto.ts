import {IsEmail, IsEnum, IsString, MaxLength, MinLength} from 'class-validator';
import {Role} from 'src/auth/entities/user.roles.enum';

export class SignInCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    password: string;


}

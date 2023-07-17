import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {Role} from 'src/auth/entities/user.roles.enum';
import {PartialType} from '@nestjs/mapped-types';

class ClientCredentialsDto {
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

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    tel: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    ville: string;

    // @IsEnum(Role)
    role: Role;
}

export class UpdateClientCredentialsDto extends PartialType(ClientCredentialsDto) {
}

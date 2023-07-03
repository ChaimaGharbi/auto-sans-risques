import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/entities/user.roles.enum';

export class UpdateClientCredentialsDto {
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

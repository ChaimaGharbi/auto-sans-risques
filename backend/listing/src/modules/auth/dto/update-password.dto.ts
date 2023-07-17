import {IsString, MaxLength, MinLength} from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    new: string;

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    old: string;
}

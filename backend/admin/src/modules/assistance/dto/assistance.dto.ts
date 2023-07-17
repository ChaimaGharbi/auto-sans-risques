import {IsString, MaxLength, MinLength} from 'class-validator';

export class AssistanceDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  tel: string;
}

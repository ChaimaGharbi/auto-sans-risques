import {IsArray, IsMongoId, IsString, MaxLength, MinLength} from 'class-validator';

export class questionDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  question: string;

  typeInput: string;

  @IsMongoId()
  categoryId: any;

  @IsArray()
  choices: string[];

  @IsArray()
  colors: string[];
}

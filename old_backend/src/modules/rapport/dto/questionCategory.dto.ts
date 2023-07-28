import {IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

export class questionCategoryDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  category_name: string;

  @Min(0)
  @Max(100)
  priority: number;
}

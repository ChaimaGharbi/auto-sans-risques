import {Type} from 'class-transformer';
import {IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

export class ArticleCategoryDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  category_name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  priority: number;
}

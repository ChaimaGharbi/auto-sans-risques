import {Type} from 'class-transformer';
import {IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

export class ArticleDto {
  @IsString()
  @MinLength(4)
  @MaxLength(200)
  title: string;

  @IsString()
  content: string;

  articleImg: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  priority: number;

  @IsMongoId()
  categoryId: any;
}

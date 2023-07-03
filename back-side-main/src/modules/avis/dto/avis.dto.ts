import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class avisDto {
  @IsString()
  @MinLength(8)
  @MaxLength(300)
  commentaire: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  note: number;

  @IsMongoId()
  clientId: any;

  @IsMongoId()
  expertId: any;
}

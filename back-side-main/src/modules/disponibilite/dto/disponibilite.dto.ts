import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString, Max, Min, MinLength, IsDateString, IsOptional } from 'class-validator';

export class DisponibiliteDto {
  @IsDateString()
  date: string;

  @IsNumber()
  startHour: number;

  @IsNumber()
  endHour: number;

  @Type(() => Number)
  @IsNumber()
  start: number;

  @Type(() => Number)
  @IsNumber()
  end: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(8)
  dayNumber: number;

  @IsMongoId()
  @IsOptional()
  expertId: any;
}

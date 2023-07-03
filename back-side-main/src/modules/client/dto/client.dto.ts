import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class ClientDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(3)
  status: number;

  isVerified: any;
}

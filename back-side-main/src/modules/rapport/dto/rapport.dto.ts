import { IsMongoId, IsNumber } from 'class-validator';

export class rapportDto {
  etat: string;

  @IsMongoId()
  clientId: any;

  @IsMongoId()
  expertId: any;

  @IsMongoId()
  reservationId: any;

  numIdentify?: number;
}

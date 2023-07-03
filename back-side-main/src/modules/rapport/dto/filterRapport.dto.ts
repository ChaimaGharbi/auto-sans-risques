import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';

export class filterRapportDto {
  filter: {
    _id: any;
    clientId: any;
    expertId: any;
    etat: any;
  };
  pageNumber: number;
  pageSize: number;
  sortField: any;
  sortOrder: any;
}

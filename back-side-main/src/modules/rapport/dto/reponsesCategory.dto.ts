import { IsArray } from 'class-validator';

export class reponsesCategoryDto {
  @IsArray()
  reponses: any;
}
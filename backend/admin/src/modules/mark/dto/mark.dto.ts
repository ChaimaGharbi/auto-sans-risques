import {IsMongoId, IsString} from 'class-validator';

export class MarkDto {
  @IsString()
  name: string;

  @IsMongoId()
  modelId: any;
}

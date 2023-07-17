import {Type} from 'class-transformer';
import {IsMongoId, IsString, IsArray} from 'class-validator';

export class MarkDto {
    @IsString()
    name: string;

    @IsMongoId()
    modelId: any;
}

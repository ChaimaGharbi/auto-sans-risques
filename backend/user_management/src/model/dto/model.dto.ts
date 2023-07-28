import {Type} from 'class-transformer';
import {IsArray, IsOptional, IsString} from 'class-validator';
import {Types} from 'mongoose';

export class ModelDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    marks?: [];
}

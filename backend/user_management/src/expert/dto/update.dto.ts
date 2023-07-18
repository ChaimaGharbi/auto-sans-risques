import {Type} from 'class-transformer';
import {IsArray, IsNumber, IsOptional, Max, Min} from 'class-validator';
import {Types} from 'mongoose';

export class UpdateExpertDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(3)
    status?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    credit?: number;

    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    specialitiesMarks?: [];

    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    specialitiesModels?: [];

    isVerified?: any;
}

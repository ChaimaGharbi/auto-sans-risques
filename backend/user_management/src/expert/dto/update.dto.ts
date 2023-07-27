import {PartialType} from "@nestjs/mapped-types";
import {Type} from 'class-transformer';
import {IsArray, IsNumber, IsOptional, Max, Min} from 'class-validator';
import {Types} from 'mongoose';

export class ExpertDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(3)
    status: number;

    @Type(() => Number)
    @IsNumber()
    credit: number;

    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    specialitiesModels?: [];

    @IsOptional()
    @IsArray()
    @Type(() => Types.ObjectId)
    specialitiesMarks?: [];

    isVerified: any;
}

export class UpdateExpertDto extends PartialType(ExpertDto) {
}

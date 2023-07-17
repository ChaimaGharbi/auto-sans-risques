import {Type} from 'class-transformer';
import {IsNumber} from 'class-validator';

export class PackDto {
    @Type(() => Number)
    @IsNumber()
    nb_missions: number;

    @Type(() => Number)
    @IsNumber()
    prix: number;

    @Type(() => Number)
    @IsNumber()
    priority: number;
}

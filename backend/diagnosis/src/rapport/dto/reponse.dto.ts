import {IsMongoId, IsString, MaxLength, MinLength} from 'class-validator';
import {Types} from 'mongoose';

export class reponseDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    reponse: string;

    //@IsString()
    //@MinLength(4)
    comment: string;
    color: string;

    //@IsString()
    //@MinLength(4)
    category_name: string;

    @IsMongoId()
    questionId: Types.ObjectId;

    @IsMongoId()
    rapportId: Types.ObjectId;

    @IsMongoId()
    categoryId: Types.ObjectId;
}

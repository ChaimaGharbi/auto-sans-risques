import {PartialType} from "@nestjs/mapped-types";

class UpdateExpert {
    fullName: string;
    tel: string;
    adresse: string;
    ville: string;
    specialite: string[];
    propos: string;
    certif: string[];
    specialitiesModels: [];
    specialitiesMarks: [];
    repos: boolean;
}

export class UpdateExpertDataDto extends PartialType(UpdateExpert) {
}
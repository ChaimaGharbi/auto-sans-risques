import {PartialType} from "@nestjs/mapped-types";

class UpdateExpert {
    fullName: string;
    tel: string;
    adresse: string;
    ville: string;
    specialite: string[];
    propos: string;
    certif: string[];
    img: string;
    specialitiesModels: [];
    specialitiesMarks: [];
    cin: string;
    carteFiscale: string;
    diplome: string;
    signature: string;
    repos: boolean;
    photoAtelier: string;
}

export class UpdateExpertDataDto extends PartialType(UpdateExpert) {
}
import {PartialType} from "@nestjs/mapped-types";
import {IsNotEmpty} from "class-validator";

class ClientUpdateDto {
    @IsNotEmpty()
    fullName: string;
    @IsNotEmpty()
    tel: string;
    @IsNotEmpty()
    adresse: string;
    @IsNotEmpty()
    ville: string;
}

export class ClientDto extends PartialType(ClientUpdateDto) {
}
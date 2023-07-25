import {PartialType} from "@nestjs/mapped-types";
import {ExpertDto} from "./expert.dto";

export class UpdateExpertDto extends PartialType(ExpertDto) {
}

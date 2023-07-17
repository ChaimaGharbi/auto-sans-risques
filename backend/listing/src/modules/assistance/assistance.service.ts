import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {AssistanceDto} from './dto/assistance.dto';
import {FilterAssistanceDto} from './dto/filterAssistance.dto';
import {GenericRepository} from "../../shared/generic/generic.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Assistance} from "../../entities/assistance.entity";
import {IAssistanceModel} from "../../entities/assistance.interface";


@Injectable()
export class AssistanceService {
    private readonly assistanceRepository: GenericRepository<Assistance>

    constructor(
        @InjectModel(Assistance.name) private readonly assistanceModel: IAssistanceModel) {
        this.assistanceRepository = new GenericRepository(assistanceModel);
    }

    async createAssistance(assistanceDto: AssistanceDto) {
        try {
            return await this.assistanceRepository.create(assistanceDto);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateAssitancesStatus(ids: string[], status: string) {
        try {
            await this.assistanceModel.updateMany(
                {
                    _id: {
                        $in: ids
                    }
                },
                {
                    $set: {etat: status}
                }
            );
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async fetchAssistances(filterAssistanceDto: FilterAssistanceDto) {
        try {
            return await this.assistanceRepository.aggregate(filterAssistanceDto);

            //LOOKUP/JOIN -- FOURTH STAGE
            // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}

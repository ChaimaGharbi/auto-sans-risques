import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {filterClientDto} from './dto/filterClient.dto';
import {GenericRepository} from "../shared/generic/generic.repository";
import {Client} from "./entities/client.entity";
import {InjectModel} from "@nestjs/mongoose";
import {IClientModel} from "./entities/client.interface";
import clientSort from "./client-sort";
import {ClientDto} from "./dto/client.dto";


@Injectable()
export class ClientService {
    private readonly clientRepository: GenericRepository<Client>

    constructor(
        @InjectModel(Client.name) private readonly clientModel: IClientModel,
    ) {
        this.clientRepository = new GenericRepository(clientModel);
    }

    async fetchClients(filterClientDto: filterClientDto) {
        try {

            return await this.clientRepository.aggregate(filterClientDto, clientSort);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async fetchClientId(id: any) {
        try {
            return await this.clientRepository.findById(id);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateClient(id: any, clientDto: any) {
        try {
            return await this.clientRepository.update(id, {status: clientDto.status, isVerified: clientDto.isVerified});

        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateClientsData(id: any, clientDto: ClientDto) {
        try {
            return await this.clientRepository.update(id, clientDto);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateClientsStatus(ids: string[], status: number) {
        try {
            await this.clientModel.updateMany(
                {
                    _id: {
                        $in: ids
                    }
                },
                {
                    $set: {status: status}
                }
            );
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}

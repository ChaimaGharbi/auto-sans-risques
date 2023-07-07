import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {ClientDto} from './dto/client.dto';
import {filterClientDto} from './dto/filterClient.dto';
import {GenericRepository} from "../../shared/generic.repository";
import {Client} from "../../entities/client.entity";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {pick} from "../../shared/utils";
import * as aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {IClientModel} from "../../entities/client.interface";
import clientSort from "./client-sort";


@Injectable()
export class ClientService {
    private readonly clientRepository: GenericRepository<Client>

    constructor(
        @InjectModel(Client.name) private readonly clientModel: IClientModel,
    ) {
        this.clientRepository = new GenericRepository(clientModel);
    }

    // TODO: creating generic aggregate function ( with pagination or without pagination )
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

    // TODO : studying the utility of this pick function and seeing if it is necessary to use it
    async updateClientsData(id: any, clientDto: any) {
        try {
            return await this.clientRepository.update(id, {
                status: clientDto.fullName,
                img: clientDto.img,
                tel: clientDto.tel,
                adresse: clientDto.adresse,
                ville: clientDto.ville
            });
            //
            // const client = await this.clientModel.findById(id);
            // if (!client) {
            //   return new NotFoundException('No client found');
            // }
            // client.fullName = pick(clientDto.fullName, client.fullName);
            // client.img = pick(clientDto.img, client.img);
            // client.tel = pick(clientDto.tel, client.tel);
            // client.adresse = pick(clientDto.adresse, client.adresse);
            // client.ville = pick(clientDto.ville, client.ville);
            // await client.save();
            // return client;
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

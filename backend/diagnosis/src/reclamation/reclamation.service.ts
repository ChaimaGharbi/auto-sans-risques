import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {FilterReclamationDto} from './dto/filterReclamation.dto';
import {ReclamationDto} from './dto/reclamation.dto';
import {InjectModel} from "@nestjs/mongoose";
import {GenericRepository} from "../shared/generic/generic.repository";
import {Reclamation} from "./entities/reclamation.entity";
import {Reservation} from "../reservation/entities/reservation.entity";
import {IReclamationModel} from "./entities/reclamation.interface";
import {IReservationModel} from "../reservation/entities/reservation.interface";


@Injectable()
export class ReclamationService {
    private readonly reclamationRepository: GenericRepository<Reclamation>
    private readonly reservationRepository: GenericRepository<Reservation>

    constructor(
        @InjectModel(Reclamation.name) private reclamationModel: IReclamationModel,
        @InjectModel(Reservation.name) private reservationModel: IReservationModel
    ) {
        this.reclamationRepository = new GenericRepository(reclamationModel)
        this.reservationRepository = new GenericRepository(reservationModel)
    }

    async createReclamation(reclamationDto: ReclamationDto) {
        try {
            await this.reservationRepository.findById(reclamationDto.reservationId);
            return await this.reclamationRepository.create(reclamationDto);
        } catch (error) {
            return error
        }
    }

    async getReclamationById(id: any) {
        try {
            const reclamation = await this.reclamationModel
                .findById(id)
                .populate('clientId', {fullName: 1, adresse: 1, ville: 1, tel: 1, img: 1})
                .populate('expertId', {fullName: 1, adresse: 1, ville: 1, tel: 1, img: 1})
                .populate('reservationId');
            if (!reclamation) return new NotFoundException('No reclamation found');
            return reclamation;
        } catch (error) {
            return error
        }
    }

    async updateReclamationsStatus(ids: string[], status: string) {
        try {
            await this.reclamationModel.updateMany(
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

    async fetchReclamations(filterReclamationDto: FilterReclamationDto) {
        try {
            const aggregate_options: any[] = [
                {
                    $lookup: {from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert'}
                },
                {
                    $lookup: {from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client'}
                },
                {
                    $lookup: {from: 'reservations', localField: 'reservationId', foreignField: '_id', as: 'reservation'}
                },
                {
                    $addFields: {
                        _id: {$toString: '$_id'},
                        expertId: {$toString: '$expertId'},
                        clientId: {$toString: '$clientId'},
                        reservationId: {$toString: '$reservationId'},
                    }
                }
            ];
            return await this.reclamationRepository.aggregate(filterReclamationDto, aggregate_options);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}

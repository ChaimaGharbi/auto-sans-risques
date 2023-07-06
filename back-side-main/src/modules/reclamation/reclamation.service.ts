import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {FilterReclamationDto} from './dto/filterReclamation.dto';
import {ReclamationDto} from './dto/reclamation.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Reclamation} from "../../entities/reclamation.entity";
import {IReclamationModel} from "../../entities/reclamation.interface";
import {Reservation} from "../../entities/reservation.entity";
import {IReservationModel} from "../../entities/reservation.interface";
import {GenericRepository} from "../../shared/generic.repository";

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
            throw new InternalServerErrorException(error);
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
            throw new InternalServerErrorException(error);
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
          const aggregate_options = [];

          const options = {
              page: filterReclamationDto.pageNumber,
              limit: filterReclamationDto.pageSize,
              collation: {locale: 'en'},
              customLabels: {
                  totalDocs: 'totalCount',
                  docs: 'entities'
              }
          };

          aggregate_options.push({
              $lookup: {from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert'}
          });

          aggregate_options.push({
              $lookup: {from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client'}
          });

          aggregate_options.push({
              $lookup: {from: 'reservations', localField: 'reservationId', foreignField: '_id', as: 'reservation'}
          });

          aggregate_options.push({
              $addFields: {
                  _id: {$toString: '$_id'},
                  expertId: {$toString: '$expertId'},
                  reservationId: {$toString: '$reservationId'},
                  clientId: {$toString: '$clientId'}
              }
          });

          //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
          const {_id, reservationId, email, fullName, etat, clientId} = filterReclamationDto.filter;

          interface IMatch {
              reservationId?: any;
              etat?: any;
              fullName?: any;
              email?: any;
              _id?: any;
              clientId?: any;
          }

          const match: IMatch = {};

          //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
          if (_id) match._id = {$regex: _id, $options: 'i'};
          if (reservationId) match.reservationId = {$regex: reservationId, $options: 'i'};
          if (email) match.email = {$regex: email, $options: 'i'};
          if (fullName) match.fullName = {$regex: fullName, $options: 'i'};
          if (etat) match.etat = {$regex: etat, $options: 'i'};
          if (clientId) match.clientId = {$regex: clientId, $options: 'i'};

          //filter by date


          aggregate_options.push({$match: match});

          //SORTING -- THIRD STAGE
          const sortOrderU = filterReclamationDto.sortField && filterReclamationDto.sortOrder === 'desc' ? -1 : 1;
          if (filterReclamationDto.sortField === 'date') {
              aggregate_options.push({$sort: {date: sortOrderU}});
          } else {
              aggregate_options.push({$sort: {_id: sortOrderU}});
          }

          //LOOKUP/JOIN -- FOURTH STAGE
          // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

          // Set up the aggregation
          const myAggregate = this.reclamationModel.aggregate(aggregate_options);

          return await this.reclamationModel.aggregatePaginate(myAggregate, options, null);
      } catch (error) {
          return new InternalServerErrorException(error);
      }
  }
}

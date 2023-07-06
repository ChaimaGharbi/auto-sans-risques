import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {FilterPackDto} from './dto/filterPack.dto';
import {PackDto} from './dto/pack.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Pack} from "../../entities/pack.entity";
import {IPackModel} from "../../entities/pack.interface";
import {GenericRepository} from "../../shared/generic.repository";

@Injectable()
export class PackService {
    private readonly packRepository: GenericRepository<Pack>

    constructor(@InjectModel(Pack.name) private packModel: IPackModel) {
        this.packRepository = new GenericRepository<Pack>(packModel)
    }

    async createPack(packDto: PackDto) {
        try {
            return this.packModel.create(packDto);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updatePack(packDto: PackDto, id: any) {
        try {
            return this.packRepository.update(id, {
                nb_missions: packDto.nb_missions,
                prix: packDto.prix,
                priority: packDto.priority
            });
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async findPackById(id: any) {
        try {
            return this.packRepository.findById(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async fetchPacks() {
        try {
            return await this.packModel.find().sort({priority: -1});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deletePackById(id: any) {
        try {
            await this.packRepository.delete(id)
            return 'pack deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deletePacksByIds(ids: any) {
        try {
            await this.packModel.deleteMany({_id: {$in: ids}});
            return 'Packs deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async fetchPacksPaginate(filterPackDto: FilterPackDto) {
        try {
            const aggregate_options = [];

            const options = {
                page: filterPackDto.pageNumber,
                limit: filterPackDto.pageSize,
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            };

            aggregate_options.push({
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            });

            //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
            const {_id} = filterPackDto.filter;

            interface IMatch {
                tel?: any;
                etat?: any;
                _id?: any;
            }

            const match: IMatch = {};

            //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
            if (_id) match._id = {$regex: _id, $options: 'i'};

            //filter by date


            aggregate_options.push({$match: match});

            //SORTING -- THIRD STAGE
            const sortOrderU = filterPackDto.sortField && filterPackDto.sortOrder === 'desc' ? -1 : 1;
            if (filterPackDto.sortField === 'priority') {
                aggregate_options.push({$sort: {priority: sortOrderU}});
            } else {
                aggregate_options.push({$sort: {_id: sortOrderU}});
            }

            //LOOKUP/JOIN -- FOURTH STAGE
            // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

            // Set up the aggregation
            const myAggregate = this.packModel.aggregate(aggregate_options);

            return await this.packModel.aggregatePaginate(myAggregate, options, null);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
  }
}

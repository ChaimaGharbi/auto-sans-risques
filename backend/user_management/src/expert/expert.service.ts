import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {filterExpertDto} from './dto/filterExpert.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Expert} from "./entities/expert.entity";
import {Model} from "mongoose";
import {GenericRepository} from "../shared/generic/generic.repository";
import {IExpertModel} from "./entities/expert.interface";
import {Disponibilite} from "../disponibilite/entities/disponibilite.entity";

@Injectable()
export class ExpertService {
    private readonly expertRepository: GenericRepository<Expert>

    constructor(
        @InjectModel(Expert.name) private readonly expertModel: IExpertModel,
        @InjectModel(Disponibilite.name) private readonly disponibiliteModel: Model<Disponibilite>
    ) {
        this.expertRepository = new GenericRepository(expertModel);
    }

    async fetchExperts(filterExpertDto: filterExpertDto, group: any) {
        try {
            const aggregate_options: any[] = [];
            console.log(filterExpertDto);

            const meters = 20000; // 20Km
            const coef = meters * 0.0000089;
            const new_lat_lt = filterExpertDto.filter.lat - coef;
            const new_lat_gt = filterExpertDto.filter.lat + coef;
            const new_lng_lt = filterExpertDto.filter.lng - coef / Math.cos(filterExpertDto.filter.lng * 0.018);
            const new_lng_gt = filterExpertDto.filter.lng + coef / Math.cos(filterExpertDto.filter.lng * 0.018);

            const match: any = {
                repos: false
            };

            if (filterExpertDto.filter.lat) match.lat = {$gte: new_lat_lt, $lt: new_lat_gt};
            if (filterExpertDto.filter.lng) match.lng = {$gte: new_lng_lt, $lt: new_lng_gt};

            const sortOrderU = filterExpertDto.sortField && filterExpertDto.sortOrder === 'desc' ? -1 : 1;
            if (filterExpertDto.sortField === 'note') {
                aggregate_options.push({$sort: {note: sortOrderU}});
            } else if (filterExpertDto.sortField === 'fullName') {
                aggregate_options.push({$sort: {fullName: sortOrderU}});
            } else {
                aggregate_options.push({$sort: {_id: sortOrderU}});
            }

            const pipelines = [];

            if (filterExpertDto.filter.fullName) {
                match.fullName = {$regex: filterExpertDto.filter.fullName, $options: 'i'};
            }

            pipelines.push({$match: match});

            if (filterExpertDto.filter.dateRange[0] && filterExpertDto.filter.dateRange[1]) {
                pipelines.push({
                    $match: {
                        $or: [
                            {
                                $and: [
                                    {$lte: ['$start', Date.parse(filterExpertDto.filter.dateRange[0])]},
                                    {$gte: ['$end', Date.parse(filterExpertDto.filter.dateRange[1])]}
                                ]
                            },
                            {
                                $and: [
                                    {$gte: ['$start', Date.parse(filterExpertDto.filter.dateRange[0])]},
                                    {$lte: ['$end', Date.parse(filterExpertDto.filter.dateRange[1])]}
                                ]
                            },
                            {
                                $and: [
                                    {$lte: ['$start', Date.parse(filterExpertDto.filter.dateRange[1])]},
                                    {$gte: ['$end', Date.parse(filterExpertDto.filter.dateRange[0])]}
                                ]
                            }
                        ]
                    }
                });
            }

            pipelines.push({
                $project: {
                    _id: {$toString: '$_id'},
                    fullName: 1,
                    ville: 1,
                    img: 1,
                    roles: {$arrayElemAt: ['$roles', 0]},
                    adresse: {$concat: ['$adresse', ' ', '$ville']},
                    note: 1,
                    lat: 1,
                    lng: 1,
                    specialitiesModels: 1,
                    specialitiesMarks: 1,
                    email: 1,
                    tel: 1,
                    specialite: {
                        $reduce: {
                            input: '$specialite',
                            initialValue: '',
                            in: {
                                $concat: ['$$value', {
                                    $cond: {
                                        if: {$eq: ['$$value', '']},
                                        then: '',
                                        else: ', '
                                    }
                                }, '$$this']
                            }
                        }
                    },
                    credit: 1,
                    nb_missions: 1,
                    status: 1,
                    carteFiscale: 1,
                    cin: 1,
                    diplome: 1,
                    signature: 1,
                    repos: 1,
                    photoAtelier: 1
                }
            });

            const myAggregate = this.expertModel.aggregate(pipelines);
            const experts = await this.expertModel.aggregatePaginate(myAggregate, {
                page: filterExpertDto.pageNumber,
                limit: filterExpertDto.pageSize,
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            }, null);

            const entities = experts.entities.filter(e => {
                if (filterExpertDto.specialite.specialitiesModels && filterExpertDto.specialite.specialitiesModels?.length > 0) {
                    return e.specialitiesModels.some(model => filterExpertDto.specialite.specialitiesModels.indexOf(model.toString()) !== -1);
                }
                return true;
            });

            const response = {
                ...experts,
                entities,
                totalCount: entities.length
            };

            return response;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }


    async fetchExpertId(id: any) {
        try {
            const expert = await this.expertModel
                .findById(id)
                .populate('specialitiesModels')
                .populate('specialitiesMarks');
            if (!expert) {
                return new NotFoundException();
            }
            return expert;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }


    async updateExpert(id: any, expertDto) {
        try {
            return await this.expertRepository.update(id, expertDto);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async fetchTop10Expert() {
        try {
            const experts = await this.expertModel.aggregate([
                {
                    $project: {
                        specialite: 1,
                        ville: 1,
                        fullName: 1,
                        img: 1,
                        note: 1,
                        nb_missions: 1
                    }
                },
                {$sort: {nb_missions: -1}},
                {$sort: {note: -1}},
                {$limit: 10}
            ]);
            return experts;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateExpertsStatus(ids: string[], status: number) {
        try {
            await this.expertModel.updateMany(
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

    async deleteExpertById(id: any) {
        try {
            await this.expertRepository.delete(id);
            return 'Expert deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}

import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {filterExpertDto} from './dto/filterExpert.dto';
import {UpdateExpertDto} from './dto/update.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Expert} from "./entities/expert.entity";
import {Model} from "mongoose";
import {GenericRepository} from "../shared/generic/generic.repository";
import {IExpertModel} from "./entities/expert.interface";
import {Disponibilite} from "../disponibilite/entities/disponibilite.entity";
import {UpdateExpertDataDto} from "./dto/update-expert.dto";

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

            const options = {
                page: filterExpertDto.pageNumber,
                limit: filterExpertDto.pageSize,
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            };
            aggregate_options.push({
                $project: {
                    salt: 0,
                    password: 0,
                    roles: 0,
                    carteFiscale: 0,
                    cin: 0,
                    diplome: 0,
                    signature: 0,
                    photoAtelier: 0
                }
            });
            aggregate_options.push({
                $addFields: {
                    _id: {$toString: '$_id'},
                    adresse: {$concat: ['$adresse', ' ', '$ville']},
                    specialite: {
                        $reduce: {
                            input: '$specialite',
                            initialValue: '',
                            in: {
                                $concat: [
                                    '$$value',
                                    {
                                        $cond: {
                                            if: {
                                                $eq: ['$$value', '']
                                            },
                                            then: '',
                                            else: ', '
                                        }
                                    },
                                    '$$this'
                                ]
                            }
                        }
                    }
                }
            });
            const {
                _id,
                email,
                address,
                tel,
                fullName,
                lat,
                lng,
                dateRange,
                repos,
                status,
                note
            } = filterExpertDto.filter;
            const {specialite} = filterExpertDto;

            interface IMatch {
                _id?: any;
                email?: any;
                adresse?: any;
                tel?: any;
                fullName?: any;
                status?: any;
                specialitiesModels?: any;
                specialitiesMarks?: any;
                dispos?: any;
                repos?: any;
                lat?: any;
                lng?: any;
                note?: any;
            }

            const match: IMatch = {};
            const meters = 20000; // 20Km
            const coef = meters * 0.0000089;
            const new_lat_lt = lat - coef;
            const new_lat_gt = lat + coef;
            const new_lng_lt = lng - coef / Math.cos(lng * 0.018);
            const new_lng_gt = lng + coef / Math.cos(lng * 0.018);
            if (lat) match.lat = {$gte: new_lat_lt, $lt: new_lat_gt};
            if (lng) match.lng = {$gte: new_lng_lt, $lt: new_lng_gt};
            const sortOrderU = filterExpertDto.sortField && filterExpertDto.sortOrder === 'desc' ? -1 : 1;
            if (filterExpertDto.sortField === 'note') {
                aggregate_options.push({$sort: {note: sortOrderU}});
            } else if (filterExpertDto.sortField === 'fullName') {
                aggregate_options.push({$sort: {fullName: 1}});
            } else {
                aggregate_options.push({$sort: {_id: sortOrderU}});
            }
            const pipelines = [];
            if (fullName) {
                match.fullName = {$regex: fullName, $options: 'i'};
            }
            pipelines.push({$match: match});
            const project: any = {
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
                specialite: 1,
                credit: 1,
                nb_missions: 1,
                status: 1,
                carteFiscale: 1,
                cin: 1,
                diplome: 1,
                signature: 1,
                repos: 1,
                photoAtelier: 1
            };
            pipelines.push({$project: project});
            const conditionsOr = [];
            if (conditionsOr.length > 0) {
                pipelines.push({
                    $match: {
                        $or: [...conditionsOr]
                    }
                });
            }
            const myAggregate = this.expertModel.aggregate(pipelines);
            const experts = await this.expertModel.aggregatePaginate(myAggregate, options, null);

            if (filterExpertDto.sortField === 'note') {
                const filteredByNote = await this.expertModel.find().sort({note: -1});
                experts.entities = filteredByNote;
            } else if (filterExpertDto.sortField === 'fullName') {
                const filteredByFullName = await this.expertModel.find().sort({fullName: 1});
                experts.entities = filteredByFullName;
            } else if (address != null) {
                const filteredByAddress = await this.expertModel.find({adresse: {$regex: address, $options: 'i'}});
                experts.entities = filteredByAddress;
            } else if (dateRange[0] && dateRange[1]) {
                const filteredByDateEntities = [];
                const recurrentExperts = await this.expertModel.find({recurrentAvailability: true});
                const dateObj1 = new Date(dateRange[1]);
                const dateObj0 = new Date(dateRange[0]);
                const startDayOfTheWeek = dateObj0.getDay();
                const endDayOfTheWeek = dateObj1.getDay();
                const intervalOfDays = [];
                for (let i = startDayOfTheWeek; i <= endDayOfTheWeek; i++) {
                    intervalOfDays.push(i);
                }
                const filteredExpertsByRecurrence = [];
                intervalOfDays.forEach(day => {
                    recurrentExperts.forEach(expert => {
                        if (expert.dispos.includes(day)) {
                            filteredExpertsByRecurrence.push(expert);
                        }
                    });
                });
                filteredByDateEntities.push(...filteredExpertsByRecurrence);
                // serach by time range
                const filteredDates = await this.disponibiliteModel.find({
                    $expr: {
                        $or: [
                            {
                                $and: [
                                    {$lte: ['$start', Date.parse(dateRange[0])]},
                                    {$gte: ['$end', Date.parse(dateRange[1])]}
                                    // { $eq: ['$repos', false] }
                                ]
                            },
                            {
                                $and: [
                                    {$gte: ['$start', Date.parse(dateRange[0])]},
                                    {$lte: ['$end', Date.parse(dateRange[1])]}
                                    // { $eq: ['$repos', false] }
                                ]
                            },
                            {
                                $and: [
                                    {$lte: ['$start', Date.parse(dateRange[1])]},
                                    {$gte: ['$end', Date.parse(dateRange[0])]}
                                    // { $eq: ['$repos', false] }
                                ]
                            }
                        ]
                    }
                });
                let filteredExpertsByDate = await this.expertModel.find({
                    _id: {$in: filteredDates.map(e => e.expertId)}
                });
                filteredExpertsByDate = filteredExpertsByDate.filter(e => e.recurrentAvailability == false);
                filteredByDateEntities.push(...filteredExpertsByDate);
                experts.entities = filteredByDateEntities;
            }
            const entities = experts.entities.filter(e => {
                if (e.repos) return false;
                if (specialite.specialitiesModels && specialite.specialitiesModels?.length > 0) {
                    return e.specialitiesModels.some(model => specialite.specialitiesModels.indexOf(model.toString()) !== -1);
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

    async updateExpert(id: any, expertDto: UpdateExpertDto) {
        try {
            const expert = await this.expertRepository.findById(id);
            expert.credit = expertDto.credit;
            expert.status = expertDto.status;
            expert.isVerified = expertDto.isVerified;
            expert.specialitiesModels = [...expert.specialitiesModels, ...expertDto.specialitiesModels];
            expert.specialitiesMarks = [...expert.specialitiesMarks, ...expertDto.specialitiesMarks];
            await expert.save();
            return expert;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateExpertsData(id: any, expertDto: UpdateExpertDataDto) {
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

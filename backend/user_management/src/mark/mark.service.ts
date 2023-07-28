import {Injectable} from '@nestjs/common';
import {filterMarkDto} from './dto/filterMark.dto';
import {MarkDto} from './dto/mark.dto';
import {InjectModel} from "@nestjs/mongoose";
import {GenericRepository} from "../shared/generic/generic.repository";
import {Mark} from "./entities/mark.entity";
import {IMarkModel} from "./entities/mark.interface";
import {Model as ModelCar} from "../model/entities/model.entity";
import {Model} from "mongoose";

@Injectable()
export class MarkService {
    private readonly markRepository: GenericRepository<Mark>

    constructor(
        @InjectModel(Mark.name) private markModel: IMarkModel,
        @InjectModel(ModelCar.name) private modelCarModel: Model<ModelCar>
    ) {
        this.markRepository = new GenericRepository<Mark>(markModel)
    }

    async createMark(markModel: MarkDto) {
        try {
            const markCar = new this.markModel(markModel);

            const mark = await markCar.save();
            const modelCar = await this.modelCarModel.findById(mark.modelId);
            modelCar.marks = [...modelCar.marks, mark._id];
            await modelCar.save();
            return mark;
        } catch (error) {
            return error
        }
    }

    async getMarks(filterMarkDto: filterMarkDto) {
        try {
            const options = {
                page: filterMarkDto.pageNumber,
                limit: filterMarkDto.pageSize,
                /*  page: 1,
                limit: 2, */
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            };
            const myAggregate = await this.markModel.find().populate('modelId').sort({priority: -1});

            return await this.markModel.aggregatePaginate(myAggregate, options, null);
        } catch (error) {
            return error
        }
    }

    async getMarksByModelId(modelId: any, filterMarkDto: filterMarkDto) {
        try {
            return await this.markRepository.aggregate(filterMarkDto, [], {modelId})
        } catch (error) {
            return error
        }
    }

    async getMarkById(id: any) {
        try {
            return await this.markModel.findById(id).populate('modelId').sort({priority: -1});
        } catch (error) {
            return error
        }
    }

    async updateMarkById(id: any, markDto: MarkDto,) {
        try {
            return await this.markRepository.update(id, {name: markDto.name});
        } catch (error) {
            return error
        }
    }

    async deleteMarkById(id: any) {
        try {
            await this.markRepository.delete(id);
            return 'Mark deleted';
        } catch (error) {
            return error
        }
    }

    async deleteMarksByIds(ids: any) {
        try {
            await this.markModel.deleteMany({_id: {$in: ids}});
            return 'Marks deleted';
        } catch (error) {
            return error
        }
    }
}

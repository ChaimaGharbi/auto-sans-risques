import {Injectable} from '@nestjs/common';
import {filterModelDto} from './dto/filterModel.dto';
import {ModelDto} from './dto/model.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {GenericRepository} from "../shared/generic/generic.repository";
import {Mark} from "../mark/entities/mark.entity";
import {IModelCar} from "./entities/model.interface";
import {Model as ModelCar} from "./entities/model.entity";

@Injectable()
export class ModelService {

    private readonly modelRepository: GenericRepository<ModelCar>
    private readonly markRepository: GenericRepository<Mark>

    constructor(
        @InjectModel(ModelCar.name) private modelCarModel: IModelCar,
        @InjectModel(Mark.name) private markModel: Model<Mark>,
    ) {
        this.modelRepository = new GenericRepository<ModelCar>(modelCarModel)
        this.markRepository = new GenericRepository<Mark>(markModel)
    }

    async createModel(modelDto: ModelDto) {
        try {
            return this.modelRepository.create(modelDto)
        } catch (error) {
            return error
        }
    }

    async getModels(filterModelDto: filterModelDto) {
        try {
            if (filterModelDto.withChoose) {
                return await this.modelCarModel.aggregate([
                    {
                        '$lookup': {
                            'from': 'marks',
                            'localField': 'marks',
                            'foreignField': '_id',
                            'as': 'marks'
                        }
                    }, {
                        '$project': {
                            'marks.name': 1,
                            'marks._id': 1,
                            'name': 1,
                            '_id': 1
                        }
                    }, {
                        '$addFields': {
                            'id': '$_id',
                            'label': '$name',
                            'children': '$marks'
                        }
                    }, {
                        '$project': {
                            'marks': 0,
                            '_id': 0,
                            'name': 0
                        }
                    }, {
                        '$project': {
                            'id': 1,
                            'label': 1,
                            'children': {
                                '$map': {
                                    'input': '$children',
                                    'as': 'sec',
                                    'in': {
                                        'label': '$$sec.name',
                                        'id': '$$sec._id'
                                    }
                                }
                            }
                        }
                    }, {
                        '$replaceRoot': {
                            'newRoot': {
                                '$cond': {
                                    'if': {
                                        '$ne': [
                                            '$children', []
                                        ]
                                    },
                                    'then': '$$ROOT',
                                    'else': {
                                        'id': '$id',
                                        'label': '$label'
                                    }
                                }
                            }
                        }
                    }
                ])
            }
            return await this.markRepository.aggregate(filterModelDto, [{
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            }])
        } catch (error) {
            return error
        }
    }

    async getModelById(id: any) {
        try {
            return await this.modelCarModel.findById(id).populate('marks').sort({priority: -1});
        } catch (error) {
            return error
        }
    }


    async updateModel(id: any, modelDto: ModelDto) {
        try {
            return await this.modelRepository.update(id, {marks: modelDto.marks, name: modelDto.name})
        } catch (error) {
            return error
        }
    }

    async deleteModelById(id: any) {
        try {
            await this.modelRepository.delete(id)
            return 'model deleted';
        } catch (error) {
            return error
        }
    }

    async deleteModelsByIds(ids: any) {
        try {
            await this.modelCarModel.deleteMany({_id: {$in: ids}});
            return 'Models deleted';
        } catch (error) {
            return error
        }
    }

}

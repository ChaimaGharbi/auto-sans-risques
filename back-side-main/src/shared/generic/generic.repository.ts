import {NotFoundException} from '@nestjs/common';
import * as mongoose from 'mongoose';
import {Model, UpdateQuery} from 'mongoose';
import sort from "./sort";
import {matching} from "./aggregation/matching";
import {sorting} from "./aggregation/sorting";
import {pagination} from "./aggregation/pagination";

export class GenericRepository<T> {
    private readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new NotFoundException('Invalid ID');
            }
            const result = await this.model.findById(id);
            if (!result) {
                throw new NotFoundException('Not found');
            }
            return result
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<T[]> {
        try {
            return await this.model.find();
        } catch (error) {
            throw error;
        }
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new NotFoundException('Invalid ID');
            }
            await this.findById(id);
            return await this.model.findByIdAndUpdate(id, data);
        } catch (error) {
            throw error;
        }
    }

    // async updateMany (ids,data) {
    //     try {
    //         const updateObject : UpdateQuery<T> = { $set: { ...data } };
    //         await this.model.updateMany(
    //             {
    //                 _id: {
    //                     $in: ids
    //                 }
    //             },
    //             {
    //                 $set: data
    //             }
    //         );
    //     } catch (error) {
    //         throw error;
    //     }
    // }


    async delete(id: string): Promise<T> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new NotFoundException('Invalid ID');
            }
            const result = await this.model.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Not found');
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteManyByIds(ids: []): Promise<void> {
        try {
            await this.model.deleteMany({_id: {$in: ids}});
        } catch (error) {
            throw error;
        }
    }

    async aggregate(dto, sortObject = null, match = {}): Promise<any[]> {
        try {
            let pipelines
            if (sortObject) {
                pipelines = [...sortObject]
            } else {
                pipelines = [...sort]
            }
            matching(pipelines, {...dto.filter, ...match});
            sorting(pipelines, dto);
            pipelines = pagination(pipelines, dto);
            const aggregation = await this.model.aggregate(pipelines);
            return aggregation[0];
        } catch (error) {
            throw error;
        }
    }
}

import {InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {Model, UpdateQuery} from 'mongoose';

export class GenericRepository<T> {
    private readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T> {
        try {
            const result = this.model.findById(id);
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
            return this.model.find();
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
            return await this.model.findByIdAndUpdate(id, data, {new: true}).exec();
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

    async aggregate(pipeline: any[]): Promise<any[]> {
        try {
            return await this.model.aggregate(pipeline).exec();
        } catch (error) {
            throw error;
        }
    }
}

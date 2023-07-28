import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {FilterPackDto} from './dto/filterPack.dto';
import {PackDto} from './dto/pack.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Pack} from "../../entities/pack.entity";
import {IPackModel} from "../../entities/pack.interface";
import {GenericRepository} from "../../shared/generic/generic.repository";

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
            return error
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
            return error
        }
    }

    async fetchPacks() {
        try {
            return await this.packModel.find().sort({priority: -1});
        } catch (error) {
            return error
        }
    }

    async deletePackById(id: any) {
        try {
            await this.packRepository.delete(id)
            return 'pack deleted';
        } catch (error) {
            return error
        }
    }

    async deletePacksByIds(ids: any) {
        try {
            await this.packModel.deleteMany({_id: {$in: ids}});
            return 'Packs deleted';
        } catch (error) {
            return error
        }
    }

    async fetchPacksPaginate(filterPackDto: FilterPackDto) {
        try {
            return await this.packRepository.aggregate(filterPackDto, [{
                $addFields: {
                    _id: {$toString: '$_id'}
                }
            }])
        } catch (error) {
            return new InternalServerErrorException(error);
        }
  }
}

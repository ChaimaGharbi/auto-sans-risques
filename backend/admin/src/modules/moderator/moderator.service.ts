import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {ModeratorDto} from './dto/moderator.dto';
import {filterModeratorDto} from './dto/filterModerator.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Moderator} from "../../entities/moderator.entity";
import {Model} from "mongoose";
import {GenericRepository} from "../../shared/generic/generic.repository";

@Injectable()
export class ModeratorService {
    private readonly moderatorRepository: GenericRepository<Moderator>;

    constructor(@InjectModel(Moderator.name) private moderatorModel: Model<Moderator>) {
        this.moderatorRepository = new GenericRepository<Moderator>(moderatorModel);
    }

    async fetchModerators(filterModeratorDto: filterModeratorDto) {
        try {
            return await this.moderatorRepository.aggregate(filterModeratorDto)
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async fetchModeratorId(id: any) {
        try {
            const moderator = await this.moderatorModel.findById(id).select('-password -salt');
            if (!moderator) {
                return new NotFoundException();
            }
            return moderator;
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }

    async updateModerator(id: any, moderatorDto: ModeratorDto) {
        try {
            return this.moderatorRepository.update(id, {
                fullName: moderatorDto.fullName,
                tel: moderatorDto.tel,
                allows: moderatorDto.allows,
                isVerified: moderatorDto.isVerified
            })
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }


    async deleteModeratorById(id: any) {
        try {
            await this.moderatorRepository.delete(id)
            return 'Moderator deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteModeratorsByIds(ids: any) {
        try {
            await this.moderatorModel.deleteMany({_id: {$in: ids}});
            return 'Moerators deleted';
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}

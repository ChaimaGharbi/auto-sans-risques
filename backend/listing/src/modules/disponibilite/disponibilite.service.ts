import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {DisponibiliteDto} from './dto/disponibilite.dto';
import {Model, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Disponibilite} from "../../entities/disponibilite.entity";
import {Expert} from "../../entities/expert.entity";

@Injectable()
export class DisponibiliteService {

    constructor(
        @InjectModel(Disponibilite.name) private readonly disponibiliteModel: Model<Disponibilite>,
        @InjectModel(Expert.name) private readonly expertModel: Model<Expert>
    ) {
    }

    async createDisponibilite(disponibiliteDto: DisponibiliteDto) {
        try {
            const disponibilite = new this.disponibiliteModel(disponibiliteDto);
            const dispo = await disponibilite.save();
            const expert = await this.expertModel.findById(disponibiliteDto.expertId);
            expert.dispos.push(dispo.dayNumber);
            await expert.save();
            return dispo;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteDisponibiliteById(id: any) {
        try {
            const dispo = await this.disponibiliteModel.findById(id);
            const expert = await this.expertModel.findById(dispo.expertId);
            const index = expert.dispos.indexOf(dispo.dayNumber);
            if (index > -1) {
                expert.dispos.splice(index, 1);
            }
            await expert.save();
            await dispo.delete();

            return 'deleted';
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async changeReposOrRecurrent(
        id: any,
        value: {
            repos?: boolean;
            recurrent?: boolean;
        }
    ) {
        try {
            /*     await this.disponibiliteModel.find(
              { expertId: Types.ObjectId(id) },
              { qty: { $gte: 1633428000 } }
            ); */
            let v;
            if (value.repos !== undefined) {
                v = {repos: value.repos};
            }
            if (value.recurrent !== undefined) {
                v = {recurrentAvailability: value.recurrent};
            }

            console.log({
                v,
                value
            });

            const expert = await this.expertModel.findByIdAndUpdate(id, v, {new: true}).lean();

            return {
                repos: expert.repos,
                recurrent: expert.recurrentAvailability
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async fetchDisposByExpertId(id: any, fromDate?: number) {
        try {
            /*     await this.disponibiliteModel.find(
              { expertId: Types.ObjectId(id) },
              { qty: { $gte: 1633428000 } }
            ); */
            let query;
            if (fromDate) {
                query = {expertId: Types.ObjectId(id), start: {$gte: fromDate}};
            } else {
                query = {expertId: Types.ObjectId(id)};
            }
            console.log('query', query);
            const dispos = await this.disponibiliteModel.find(query);
            /*  const dispos = await this.disponibiliteModel.aggregate(
            [ { $match : {start: { $gte: fromDate }} } ] */
            const expert = await this.expertModel.findById(id);
            console.log('expert', expert);
            return {
                dispos,
                repos: expert.repos,
                recurrent: expert.recurrentAvailability
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteDisposByExpertId(id: any) {
        try {
            await this.disponibiliteModel.deleteMany({expertId: Types.ObjectId(id)});
            const expert = await this.expertModel.findById(id);
            expert.dispos = [];
            await expert.save();
            return 'deleted';
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateExpertDispo(id: any) {
        try {
            const expert = await this.expertModel.findById(id);
            if (!expert) {
                return new NotFoundException('No expert found for provided id');
            }
            expert.repos = !expert.repos;
            await expert.save();
            return expert.repos;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}

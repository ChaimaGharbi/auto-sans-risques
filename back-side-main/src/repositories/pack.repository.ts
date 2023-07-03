import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pack } from 'src/entities/pack.entity';
import { IPackModel } from 'src/entities/pack.interface';
import { FilterPackDto } from 'src/modules/pack/dto/filterPack.dto';
import { PackDto } from 'src/modules/pack/dto/pack.dto';

export class PackRepository {
  constructor(@InjectModel(Pack.name) private packModel: IPackModel) {}

  async createPack(packDto: PackDto) {
    try {
      const pack = new this.packModel(packDto);
      await pack.save();
      return pack;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePack(packDto: PackDto, id: any) {
    try {
      const pack = await this.packModel.findById(id);
      if (!pack) {
        return new NotFoundException('Pack not found');
      }
      pack.nb_missions = packDto.nb_missions;
      pack.prix = packDto.prix;
      pack.priority = packDto.priority;

      await pack.save();
      return pack;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findPackById(id: any) {
    try {
      const pack = await this.packModel.findById(id);
      if (!pack) {
        return new NotFoundException('Pack not found');
      }
      return pack;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchPacks() {
    try {
      const pack = await this.packModel.find().sort({ priority: -1 });
      if (!pack) {
        return new NotFoundException('Pack not found');
      }
      return pack;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deletePackById(id: any) {
    try {
      const pack = await this.packModel.findByIdAndDelete(id);
      if (!pack) {
        return new NotFoundException('Pack not found');
      }
      return 'pack deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deletePacksByIds(ids: any) {
    try {
      await this.packModel.deleteMany({ _id: { $in: ids } });
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
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id } = filterPackDto.filter;
      interface IMatch {
        tel?: any;
        etat?: any;
        _id?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };

      //filter by date
      

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterPackDto.sortField && filterPackDto.sortOrder === 'desc' ? -1 : 1;
      if (filterPackDto.sortField === 'priority') {
        aggregate_options.push({ $sort: { priority: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.packModel.aggregate(aggregate_options);

      const packs = await this.packModel.aggregatePaginate(myAggregate, options, null);
      return packs;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

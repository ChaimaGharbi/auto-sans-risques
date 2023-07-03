import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assistance } from 'src/entities/assistance.entity';
import { IAssistanceModel } from 'src/entities/assistance.interface';
import { AssistanceDto } from 'src/modules/assistance/dto/assistance.dto';
import { FilterAssistanceDto } from 'src/modules/assistance/dto/filterAssistance.dto';

export class AssistanceRepository {
  constructor(@InjectModel(Assistance.name) private assistanceModel: IAssistanceModel) {}

  async createAssistance(assistanceDto: AssistanceDto) {
    try {
      const assistance = new this.assistanceModel(assistanceDto);
      await assistance.save();
      return assistance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateAssitancesStatus(ids: string[], status: string) {
    try {
      await this.assistanceModel.updateMany(
        {
          _id: {
            $in: ids
          }
        },
        {
          $set: { etat: status }
        }
      );
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async fetchAssistances(filterAssistanceDto: FilterAssistanceDto) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterAssistanceDto.pageNumber,
        limit: filterAssistanceDto.pageSize,
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
      const { _id, tel, etat } = filterAssistanceDto.filter;
      interface IMatch {
        tel?: any;
        etat?: any;
        _id?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (tel) match.tel = { $regex: tel, $options: 'i' };
      if (etat) match.etat = { $regex: etat, $options: 'i' };

      //filter by date
      

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterAssistanceDto.sortField && filterAssistanceDto.sortOrder === 'desc' ? -1 : 1;
      if (filterAssistanceDto.sortField === 'date') {
        aggregate_options.push({ $sort: { date: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.assistanceModel.aggregate(aggregate_options);

      const assistances = await this.assistanceModel.aggregatePaginate(myAggregate, options, null);
      return assistances;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

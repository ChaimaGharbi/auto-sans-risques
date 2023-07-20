import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Disponibilite } from 'src/entities/disponibilite.entity';
import { Expert } from 'src/entities/expert.entity';
import { IExpertModel } from 'src/entities/expert.interface';
import { filterExpertDto } from 'src/modules/expert/dto/filterExpert.dto';
import { UpdateExpertDto } from 'src/modules/expert/dto/update.dto';
import { Logger } from "@nestjs/common";
function equalArrays(first, second) {
  if (first.length !== second.length) return false;
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) return false;
  }
  return true;
}
function pick(v, old) {
  if (!Array.isArray(v)) {
    if (v && v !== old) {
      return v;
    }
  } else {
    if (v && !equalArrays(v, old)) {
      return v;
    }
  }
  return old;
}
export class ExpertRepository {
  constructor(
    @InjectModel(Expert.name) private expertModel: IExpertModel,
    @InjectModel(Disponibilite.name) private disponibiliteModel: any
  ) {}
  async fetchExperts(filterExpertDto: filterExpertDto, group: any) {
    try {
      const aggregate_options: any[] = [];
      console.log(filterExpertDto);
      
      const options = {
        page: filterExpertDto.pageNumber,
        limit: filterExpertDto.pageSize,
        collation: { locale: 'fr' },
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
          _id: { $toString: '$_id' },
          adresse: { $concat: ['$adresse', ' ', '$ville'] },
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
      const { _id, email, address, tel, fullName, lat, lng, dateRange, repos, status, note } = filterExpertDto.filter;
      const { specialite } = filterExpertDto;
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
      if (lat) match.lat = { $gte: new_lat_lt, $lt: new_lat_gt };
      if (lng) match.lng = { $gte: new_lng_lt, $lt: new_lng_gt };
      const sortOrderU = filterExpertDto.sortField && filterExpertDto.sortOrder === 'desc' ? -1 : 1;
      if (filterExpertDto.sortField === 'note') {
        aggregate_options.push({ $sort: { note: sortOrderU } });
      } else if (filterExpertDto.sortField === 'fullName') {
        aggregate_options.push({ $sort: { fullName: 1 } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }
      const pipelines = [];
      if (fullName) {
        match.fullName = { $regex: fullName, $options: 'i' };
      }
      pipelines.push({ $match: match });
      const project: any = {
        fullName: 1,
        ville: 1,
        img: 1,
        roles: { $arrayElemAt: ['$roles', 0] },
        adresse: { $concat: ['$adresse', ' ', '$ville'] },
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
      pipelines.push({ $project: project });
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
        const filteredByNote = await this.expertModel.find().sort({ note: -1 });
        experts.entities = filteredByNote;
      } else if (filterExpertDto.sortField === 'fullName') {
        const filteredByFullName = await this.expertModel.find().sort({ fullName: 1 });
        experts.entities = filteredByFullName;
      } else if (address != null) {
        const filteredByAddress = await this.expertModel.find({ adresse: { $regex: address, $options: 'i' } });
        experts.entities = filteredByAddress;
      } else if (dateRange[0] && dateRange[1]) {
        const filteredByDateEntities = [];
        const recurrentExperts = await this.expertModel.find({ recurrentAvailability: true });
        const dateObj1 = new Date(dateRange[1]);
        const dateObj0 = new Date(dateRange[0]);
        const startDayOfTheWeek = dateObj0.getDay();
        const endDayOfTheWeek = dateObj1.getDay();
        const intervalOfDays = [];
        for (let i = startDayOfTheWeek; i <= endDayOfTheWeek; i++) {
          intervalOfDays.push(i);
        }
        const filteredExpertsByRecurrence = [];
        console.log(intervalOfDays);
        intervalOfDays.forEach(day => {
          recurrentExperts.forEach(expert => {
            console.log(expert);
            if (expert.dispos.includes(day)) {
              if (!filteredExpertsByRecurrence.includes(expert))
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
                  { $lte: ['$start', Date.parse(dateRange[0])] },
                  { $gte: ['$end', Date.parse(dateRange[1])] }
                  // { $eq: ['$repos', false] }
                ]
              },
              {
                $and: [
                  { $gte: ['$start', Date.parse(dateRange[0])] },
                  { $lte: ['$end', Date.parse(dateRange[1])] }
                  // { $eq: ['$repos', false] }
                ]
              },
              {
                $and: [
                  { $lte: ['$start', Date.parse(dateRange[1])] },
                  { $gte: ['$end', Date.parse(dateRange[0])] }
                  // { $eq: ['$repos', false] }
                ]
              }
            ]
          }
        });
        console.log(filteredDates);
        let filteredExpertsByDate = await this.expertModel.find({
          _id: { $in: filteredDates.map(e => e.expertId) }
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
      } else
      
        return {
          _id: expert._id,
          fullName: expert.fullName,
          spec: expert.specialite,
          tel: expert.tel,
          address: expert.adresse,
          gouv: expert.ville,
          note: expert.note,
          email: expert.email,
          propos: expert.propos,
          // status: expert.status,
          // isVerified: expert.isVerified,
          certif: expert.certif,
          nb_missions: expert.nb_missions,
          // credit: expert.credit,
          profile: expert.img,
          specialitiesModels: expert.specialitiesModels,
          specialitiesMarks: expert.specialitiesMarks,
          // repos: expert.repos,
          cin: expert.cin,
          diplome: expert.diplome,
          signature: expert.signature,
          carteFiscale: expert.carteFiscale,
          photoAtelier: expert.photoAtelier,
          createdAt: expert.createdAt
        };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
  async updateExpert(id: any, expertDto: UpdateExpertDto) {
    try {
      const expert = await this.expertModel.findById(id);
      if (!expert) {
        return new NotFoundException('No expert found');
      }
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
  async updateExpertsData(id: any, expertDto: any) {
    try {
      const expert = await this.expertModel.findById(id);
      if (!expert) {
        return new NotFoundException('No expert found');
      }

      expert.fullName = pick(expertDto.fullName, expert.fullName);
      expert.tel = pick(expertDto.tel, expert.tel);
      expert.adresse = pick(expertDto.adresse, expert.adresse);
      expert.ville = pick(expertDto.ville, expert.ville);
      expert.specialite = pick(expertDto.specialite, expert.specialite);
      expert.propos = pick(expertDto.propos, expert.propos);
      expert.certif = pick(expertDto.certif, expert.certif);
      expert.img = pick(expertDto.img, expert.img);
      expert.specialitiesModels = pick(expertDto.specialitiesModels, expert.specialitiesModels);
      expert.specialitiesMarks = pick(expertDto.specialitiesMarks, expert.specialitiesMarks);
      expert.cin = pick(expertDto.cin, expert.cin);
      expert.diplome = pick(expertDto.diplome, expert.diplome);
      expert.signature = pick(expertDto.signature, expert.signature);
      expert.carteFiscale = pick(expertDto.carteFiscale, expert.carteFiscale);
      expert.photoAtelier = pick(expertDto.photoAtelier, expert.photoAtelier);
      // expert.specialitiesModels = [...expert.specialitiesModels, ...expertDto.specialitiesModels];
      // expert.specialitiesMarks = [...expert.specialitiesMarks, ...expertDto.specialitiesMarks];
      await expert.save();
      return expert;
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
        { $sort: { nb_missions: -1 } },
        { $sort: { note: -1 } },
        { $limit: 10 }
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
          $set: { status: status }
        }
      );
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
  async deleteExpertById(id: any) {
    try {
      const expert = await this.expertModel.findByIdAndDelete(id);
      if (!expert) {
        return new NotFoundException('Expert not found');
      }
      return 'Expert deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

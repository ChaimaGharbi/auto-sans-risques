import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Avis } from 'src/entities/avis.entity';
import { IAvisModel } from 'src/entities/avis.interface';
import { Expert } from 'src/entities/expert.entity';
import { ImageAvis } from 'src/entities/image_avis.entity';
import { avisDto } from 'src/modules/avis/dto/avis.dto';
import { FilterAvisDto } from 'src/modules/avis/dto/filterAvis.dto';
import { uploadImage } from 'src/utils/upload.files';

export class AvisRepository {
  constructor(
    @InjectModel(Avis.name) private avisModel: IAvisModel,
    @InjectModel(Expert.name) private expertModel: Model<Expert>,
    @InjectModel(ImageAvis.name) private imageAvisModel: Model<ImageAvis>
  ) {}

  async createAvis(avisDto: avisDto, images: any) {
    try {
      const sess = await this.avisModel.db.startSession();
      sess.startTransaction();
      const avis = new this.avisModel(avisDto);
      await avis.save({ session: sess });
      for (let i = 0; i < images?.length; i++) {
        const file = images[i];
        const imageUrl = await uploadImage(file);
        const AvisImage = new this.imageAvisModel({
          imageUrl,
          avisId: avis._id
        });
        await AvisImage.save({ session: sess });
        avis.images.push(AvisImage);
      }
      const newAvis = await avis.save({ session: sess });
      await sess.commitTransaction();
      const result = await this.avisModel.aggregate([
        { $match: { expertId: Types.ObjectId(avisDto.expertId) } },
        { $group: { _id: null, note: { $avg: '$note' } } }
      ]);
      const expert = await this.expertModel.findById(avisDto.expertId);
      expert.note = Math.round(result[0].note);
      await expert.save();
      const test = await this.avisModel.findById(newAvis._id).populate('clientId', { fullName: 1, _id: 1, img: 1 });
      return test;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchAvisById(id: any) {
    try {
      const avis = await this.avisModel
        .findById(id)
        .populate('images')
        .populate('clientId', { fullName: 1 })
        .populate('expertId', { fullName: 1 });
      if (!avis) {
        return new NotFoundException('Pas des avis');
      }
      return avis;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteAvisByIds(ids: any) {
    try {
      await this.avisModel.deleteMany({ _id: { $in: ids } });
      return 'avis deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchAvisByExpertId(expertId: any, limit: number) {
    try {
      const avis = await this.avisModel
        .find({ expertId: Types.ObjectId(expertId) })
        .populate('images', { imageUrl: 1 })
        .populate('clientId', { fullName: 1, img: 1 })
        .limit(limit)
        .sort({ date: -1 });

      const NumAvis = await this.avisModel.find({ expertId: Types.ObjectId(expertId) }).countDocuments();

      return {
        avis,
        NumAvis
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchAvisByClientId(clientId: any) {
    try {
      const avis = await this.avisModel.find({ clientId: Types.ObjectId(clientId) }).populate('images');
      if (!avis || avis.length === 0) {
        return new NotFoundException('Pas des avis pour cette user');
      }
      return avis;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateAvis(avisDto: avisDto, images: any, avisId: any) {
    try {
      const avis = await this.avisModel.findById(avisId);
      if (!avis) {
        return new NotFoundException('Pas de avis trouvée pour cette userId');
      }
      const sess = await this.avisModel.db.startSession();
      sess.startTransaction();
      avis.commentaire = avisDto.commentaire;
      avis.note = avisDto.note;
      await avis.save({ session: sess });
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const imageUrl = await uploadImage(file);
        const AvisImage = new this.imageAvisModel({
          imageUrl,
          avisId: avis._id
        });
        await AvisImage.save({ session: sess });
        avis.images.push(AvisImage);
      }
      await avis.save({ session: sess });
      await sess.commitTransaction();

      return avis;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteAvis(avisId: any) {
    try {
      const avis = await this.avisModel.findById(avisId);
      if (!avis) {
        return new NotFoundException('Pas de avis trouvée pour cette userId');
      }
      await this.avisModel.deleteOne({ _id: avisId });
      await this.imageAvisModel.deleteMany({ avisId: Types.ObjectId(avisId) });
      return 'success';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteImageAvis(imageId: any) {
    try {
      const image = await this.imageAvisModel.findById(imageId);
      if (!image) {
        return new NotFoundException('Pas de image trouvée');
      }
      await this.imageAvisModel.deleteOne({ _id: imageId });
      return 'success';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchAvisPaginate(filterAvisDto: FilterAvisDto) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterAvisDto.pageNumber,
        limit: filterAvisDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $lookup: { from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert' }
      });

      aggregate_options.push({
        $lookup: { from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client' }
      });

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' },
          expertId: { $toString: '$expertId' },
          clientId: { $toString: '$clientId' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, expertId, clientId } = filterAvisDto.filter;
      interface IMatch {
        expertId?: any;
        clientId?: any;
        _id?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (expertId) match.expertId = { $regex: expertId, $options: 'i' };
      if (clientId) match.clientId = { $regex: clientId, $options: 'i' };

      //filter by date

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterAvisDto.sortField && filterAvisDto.sortOrder === 'desc' ? -1 : 1;
      if (filterAvisDto.sortField === 'date') {
        aggregate_options.push({ $sort: { date: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.avisModel.aggregate(aggregate_options);

      const avis = await this.avisModel.aggregatePaginate(myAggregate, options, null);
      return avis;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

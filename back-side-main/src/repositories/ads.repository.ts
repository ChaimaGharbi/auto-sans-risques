import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ads } from 'src/entities/ads.entity';
import { IAdsModel } from 'src/entities/ads.interface';
import { filterAdsDto } from 'src/modules/ads/dto/filterAds.dto';
import { AdsDto } from 'src/modules/ads/dto/ads.dto';
import { pagination } from 'src/shared/pagination';
import { getPositionFromAddress } from 'src/shared/getPositionFromAddress';
export class AdsRepository {
  constructor(
    @InjectModel(Ads.name)
    private adsModel: IAdsModel /*  @InjectModel(Expert.name) private expertModel: Model<Expert>,
    @InjectModel(Client.name) private clientModel: Model<Client>, */
  ) {}
  async createAds(AdsDto: AdsDto) {
    try {
      const ads = new this.adsModel(AdsDto);
      const position = await getPositionFromAddress(AdsDto.adresse + ' ' + AdsDto.ville);
      ads.lat = position ? position.lat : AdsDto.lat;
      ads.lng = position ? position.lng : AdsDto.lat;
      const ad = await ads.save();
      return ad;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async fetchAdssPaginate(filterAdsDto: filterAdsDto) {
    try {
      const pipelines = [];
      const { title, _id, typeUser } = filterAdsDto.filter;
      interface IMatch {
        title?: any;
        _id?: any;
        typeUser?: any;
        userId?: any;
      }
      pipelines.push({
        $addFields: {
          _id: { $toString: '$_id' }
          //userId: { $toString: '$userId' },
        }
      });
      const match: IMatch = {};
      if (title) match.title = { $regex: title, $options: 'i' };
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (typeUser) match.typeUser = { $regex: typeUser, $options: 'i' };
      //if (userId) match.userId = Types.ObjectId(userId) ;
      pipelines.push({ $match: match });
      //let fromUser = filterAdsDto.role == 'EXPERT' ? 'experts' : 'clients';
      const options = {
        page: filterAdsDto.pageNumber,
        limit: filterAdsDto.pageSize
      };
      /*    pipelines.push({
        $lookup: { from: fromUser, localField: 'userId', foreignField: '_id', as: 'userId' }
      }); */
      /*  pipelines.push(  {
        $project: {
          _id:1,title: 1,body:1,url:1,img:1,lng:1,lag:1, userId: {$arrayElemAt:["$userId",0]}
        }
      }); */
      //filter by date
      const sortOrderU = filterAdsDto.sortOrder === 'desc' ? -1 : 1;
      pipelines.push({ $sort: { createdAt: sortOrderU } });
      const myAgregate = pagination(pipelines, options);
      /***************************** */
      const mypipeline = await this.adsModel.aggregate(myAgregate);
      return mypipeline[0];
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
  async getAdById(id: any) {
    try {
      const pipelines = [];
      /*const ad = await this.adsModel.findById(id);
       const expert = await this.expertModel.findById(ad.userId);
      let fromUser = expert ? 'experts' : 'clients';
      pipelines.push({
        $match: {
          _id: Types.ObjectId(id)
        }
      });
      /*  pipelines.push({
        $lookup: { from: fromUser, localField: 'userId', foreignField: '_id', as: 'userId' }
      });
      pipelines.push(  {
        $project: {
          _id:1,title: 1,body:1,url:1,img:1,lng:1,lag:1, userId: {$arrayElemAt:["$userId",0]}
        }
      }); 
      console.log({ad,expert,pipelines})*/
      const ads = await this.adsModel.aggregate(pipelines);
      return ads[0];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateAd(adsDto: AdsDto, id: any) {
    try {
      const ads = await this.adsModel.findById(id);
      console.log('update', { ads, adsDto });
      if (!ads) {
        return new NotFoundException('ads not found');
      }
      ads.title = adsDto.title;
      ads.body = adsDto.body;
      ads.url = adsDto.url;
      ads.img = adsDto.img;
      ads.typeUser = adsDto.typeUser;
      ads.isActive = adsDto.isActive;
      await ads.save();
      return ads;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteAdById(id: any) {
    try {
      const ads = await this.adsModel.findByIdAndDelete(id);
      if (!ads) {
        return new NotFoundException('ads not found');
      }
      return 'ads deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteAdsByIds(ids: any) {
    try {
      await this.adsModel.deleteMany({ _id: { $in: ids } });
      return 'Ads deleted';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

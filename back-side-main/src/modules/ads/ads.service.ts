import { Injectable } from '@nestjs/common';
import { AdsRepository } from 'src/repositories/ads.repository';
import { filterAdsDto } from './dto/filterAds.dto';
import { AdsDto } from './dto/ads.dto';

@Injectable()
export class AdsService {
  constructor(private adsRepository: AdsRepository) {}
  async create(AdsDto: AdsDto) {
    
    return await this.adsRepository.createAds(AdsDto);
    // return 'This action adds a new ads';
  }

  /*   async findAll() {
    return `This action returns all Adss`;
  } */
  async findAll(filterAdsDto: filterAdsDto) {
    
    return this.adsRepository.fetchAdssPaginate(filterAdsDto);
  }

  async findOne(id: any) {
    return await this.adsRepository.getAdById(id);
    //return `This action returns a #${id} ads`;
  }
  async update(id: any, adsDto: AdsDto) {
    //return `This action updates a #${id} ads`;
    return await this.adsRepository.updateAd(adsDto, id);
  }

  async remove(id: any) {
    // return `This action removes a #${id} ads`;
    return await this.adsRepository.deleteAdById(id);
  }

  async deleteAdsByIds(ids: any) {
    return await this.adsRepository.deleteAdsByIds(ids);
  }
}

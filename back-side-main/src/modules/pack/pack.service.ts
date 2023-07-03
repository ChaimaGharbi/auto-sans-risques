import { Injectable } from '@nestjs/common';
import { PackRepository } from 'src/repositories/pack.repository';
import { FilterPackDto } from './dto/filterPack.dto';
import { PackDto } from './dto/pack.dto';

@Injectable()
export class PackService {
  constructor(private packRepository: PackRepository) {}

  async createPack(packDto: PackDto) {
    return await this.packRepository.createPack(packDto);
  }

  async updatePack(packDto: PackDto, id: any) {
    return await this.packRepository.updatePack(packDto, id);
  }

  async findPackById(id: any) {
    return await this.packRepository.findPackById(id);
  }

  async deletePacksByIds(ids: any) {
    return await this.packRepository.deletePacksByIds(ids);
  }

  async deletePackById(id: any) {
    return await this.packRepository.deletePackById(id);
  }

  async fetchPacksPaginate(filterPackDto: FilterPackDto) {
    return await this.packRepository.fetchPacksPaginate(filterPackDto);
  }

  async fetchPacks() {
    return await this.packRepository.fetchPacks();
  }
}

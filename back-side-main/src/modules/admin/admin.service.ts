import { Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/repositories/admin.repository';
import { AdminDto } from './dto/admin.dto';
import { filterAdminDto } from './dto/filterAdmin.dto';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async fetchAdmins(filterAdminDto: filterAdminDto) {
    return this.adminRepository.fetchAdmins(filterAdminDto);
  }

  async fetchAdminId(id: any) {
    return this.adminRepository.fetchAdminId(id);
  }

  async updateAdmin(id: any, adminDto: AdminDto) {
    return this.adminRepository.updateAdmin(id, adminDto);
  }

  async remove(id: any) {
    // return `This action removes a #${id} ads`;
     return await this.adminRepository.deleteAdminById(id);
 
   }
   
   async deleteAdminsByIds(ids: any) {
     return await this.adminRepository.deleteAdminsByIds(ids);
   }
}

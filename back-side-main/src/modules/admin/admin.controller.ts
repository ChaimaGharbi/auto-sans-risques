import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { filterAdminDto } from './dto/filterAdmin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/paginate')
  async fetchRapports(@Body(ValidationPipe) filterAdminDto: filterAdminDto) {
    return await this.adminService.fetchAdmins(filterAdminDto);
  }

  @Get('/:id')
  async fetchAdminId(@Param() params) {
    return await this.adminService.fetchAdminId(params.id);
  }

  @Put('/:id')
  async updateAdmin(@Param() params, @Body(ValidationPipe) adminDto: AdminDto) {
    return await this.adminService.updateAdmin(params.id, adminDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.deleteAdminById(id);
  }

  @Post('/delete')
  async deleteAdminsByIds(@Body() body) {
    return await this.adminService.deleteAdminsByIds(body.ids);
  }
}

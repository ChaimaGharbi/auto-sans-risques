import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';
import { filterNotificationDto } from './dto/filterNotification.dto';
import { ObjectId } from 'mongoose';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationsService: NotificationService) {}

  @Post()
  create(@Body() notificationDto: NotificationDto) {
    return this.notificationsService.create(notificationDto);
  }

  /* @Get()
  findAll() {
    return this.notificationsService.findAll();
  } */

  @Post('/paginate')
  async fetchNotificationsPaginate(@Body(ValidationPipe) filterNotificationDto: filterNotificationDto) {
    console.log(filterNotificationDto);
    
    return await this.notificationsService.findAll(filterNotificationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  /*  @Put(':id')
  update(@Param('id') id: string, @Body() notificationDto: NotificationDto) {
    return this.notificationsService.update(id, notificationDto);
  } */
  @Post('/updates')
  async updateNotificationsByIds(@Body() body) {
    return await this.notificationsService.updateNotificationsByIds(body.ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }

  @Put('/updates/:id')
  async updateNotificationById(@Param('id') id:string) {
    return await this.notificationsService.updateNotificationById(id);
  }
}

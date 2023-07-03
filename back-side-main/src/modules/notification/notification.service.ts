import { Injectable } from '@nestjs/common';
import { NotificationRepository } from 'src/repositories/notification.repository';
import { filterNotificationDto } from './dto/filterNotification.dto';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}
  async create(notificationDto: NotificationDto) {
    return await this.notificationRepository.createNotification(notificationDto);
    // return 'This action adds a new notification';
  }

  /*   async findAll() {
    return `This action returns all notifications`;
  } */
  async findAll(filterNotificationDto: filterNotificationDto) {
    
    return this.notificationRepository.fetchNotificationsPaginate(filterNotificationDto);
  }

  async findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  /* async update(id: number, notificationDto: NotificationDto) {
    return `This action updates a #${id} notification`;
  } */
  async updateNotificationsByIds(ids) {
    //
    //return `This action update a  notifications`;
    return this.notificationRepository.updateNotificationsByIds(ids);
  }

  async remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}

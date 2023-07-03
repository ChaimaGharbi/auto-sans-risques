import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expert } from 'src/entities/expert.entity';
import { Notification } from 'src/entities/notification.entity';
import { INotificationModel } from 'src/entities/notification.interface';
import { Reservation } from 'src/entities/reservation.entity';
import { filterNotificationDto } from 'src/modules/notification/dto/filterNotification.dto';
import { NotificationDto } from 'src/modules/notification/dto/notification.dto';
import { getHtml } from 'src/config/mailer/mailer.helper';
import { MailerService } from 'src/config/mailer/mailer.service';
import { SmsService } from 'src/config/sms/sms.service';
import { NotificationGateway } from 'src/modules/notification/notification.gateway';
import { Client } from 'src/entities/client.entity';
import { ReservationStatus } from 'src/entities/reservation.status.enum';
import moment = require('moment');
import 'moment/locale/fr';
import { pagination } from 'src/shared/pagination';
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name) private notificationModel: INotificationModel,
    @InjectModel(Expert.name) private expertModel: Model<Expert>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
    private smsService: SmsService,
    private mailerService: MailerService,
    private notificationGateway: NotificationGateway
  ) {}

  async createNotification(notificationDto: NotificationDto) {
    try {
      let html;
      moment.locale('fr');
      
      const notification = new this.notificationModel(notificationDto);
      const expert = await this.expertModel.findById(notificationDto.receiverId);
      const reservation = await this.reservationModel.findById(notificationDto.reservationId);
      let socketReponse = {};
      if (expert) {
        const client = await this.clientModel.findById(notificationDto.senderId);
        socketReponse = {
          userId: expert._id,
          msg: notificationDto.message,
          reservation,
          client,
          expert
        };
        

        // await this.smsService.sendSmsToPhone(notificationDto.message, parseInt(expert.tel));
        const html = await getHtml(
          `<p>Bonjour ${expert.fullName},</p>\n` +
            '                        <p>\n' +
            `                          Vous avez une demande de rendez-vous par le client ${
              client.fullName
            } le ${moment(reservation.date).format('dddd DD MMMM YYYY à HH:mm')} pour un diagnostic ${
              reservation.reason !== 'Avisvente' ? "d'Achat" : 'du Vente'
            } d'une voiture ${
              reservation.typeCar
            }.\n <p> S.V.P. bien vouloir répondre OUI pour confirmer votre présence ou NON si vous ne pouvez pas vous présenter.</p>` +
            '                        </p>\n' +
            '                        <table\n' +
            '                          role="presentation"\n' +
            '                          border="0"\n' +
            '                          cellpadding="0"\n' +
            '                          cellspacing="0"\n' +
            '                          class="btn btn-primary"\n' +
            '                        >\n' +
            '                        </table>'
        );
        await this.mailerService.sendMail(expert.email, expert.fullName, 'Une nouvelle mission en attente', html);
      } else {
        let statusFr = '';
        const expert = await this.expertModel.findById(notificationDto.senderId);
        const client = await this.clientModel.findById(notificationDto.receiverId);
        if (reservation.status === ReservationStatus.ACCEPTEE) {
          html = await getHtml(
            `<p>Monsieur  ${client.fullName},</p>\n` +
              '                        <p>\n' +
              `                          L'expert ${
                expert.fullName
              } a accepté votre rendez-vous, veuillez être  à l'heure de votre RDV ${moment(reservation.date).format(
                'dddd DD MMMM YYYY à HH:mm'
              )}` +
              '                        </p>\n' +
              '                        <table\n' +
              '                          role="presentation"\n' +
              '                          border="0"\n' +
              '                          cellpadding="0"\n' +
              '                          cellspacing="0"\n' +
              '                          class="btn btn-primary"\n' +
              '                        >\n' +
              '                        </table>'
          );
          expert.nb_missions = expert.nb_missions + 1;
          await expert.save();
          statusFr = 'acceptée';
        } else if (reservation.status === ReservationStatus.REFUSEE) {
          html = await getHtml(
            `<p>Monsieur  ${client.fullName},</p>\n` +
              '                        <p>\n' +
              `                          L'expert ${expert.fullName} n'est pas disponible pour le moment, merci de changer la date de reservation ou demander la disponibilité d'un autre expert.` +
              '                        </p>\n' +
              '                        <table\n' +
              '                          role="presentation"\n' +
              '                          border="0"\n' +
              '                          cellpadding="0"\n' +
              '                          cellspacing="0"\n' +
              '                          class="btn btn-primary"\n' +
              '                        >\n' +
              '                        </table>'
          );

          statusFr = 'refusée';
        }
        socketReponse = {
          userId: client._id,
          msg: notificationDto.message,
          reservation,
          client,
          expert
        };

        // await this.smsService.sendSmsToPhone(notificationDto.message, parseInt(client.tel));

        await this.mailerService.sendMail(client.email, client.fullName, `Votre mission a été ${statusFr}`, html);
      }
      const notif = await notification.save();

      this.notificationGateway.server.emit('FromAPI', { ...socketReponse, notif });
      return notif;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async fetchNotificationsPaginate(filterNotificationDto: filterNotificationDto) {
    try {
      
      const aggregate_options = [];
      let fromSender = filterNotificationDto.role !== 'EXPERT' ? 'experts' : 'clients';
      let fromReceiver = filterNotificationDto.role == 'EXPERT' ? 'experts' : 'clients';
      const options = {
        page: filterNotificationDto.pageNumber,
        limit: filterNotificationDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };
      aggregate_options.push({
        $lookup: { from: 'reservations', localField: 'reservationId', foreignField: '_id', as: 'reservation' }
      });
      aggregate_options.push({
        $lookup: { from: fromSender, localField: 'sender', foreignField: '_id', as: 'sender' }
      });
      aggregate_options.push({
        $lookup: { from: fromReceiver, localField: 'receiver', foreignField: '_id', as: 'receiver' }
      });
      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' },
          receiverId: { $toString: '$receiverId' },
          senderId: { $toString: '$senderId' }
          //reservationId: { $toString: '$reservationId' },
        }
      });
      const { receiverId } = filterNotificationDto.filter;
      interface IMatch {
        _id?: any;
        senderId?: any;
        //reservationId?:any;
        receiverId?: any;
        is_read?: any;
      }
      const match: IMatch = {};
      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      //match.sender = { $regex: sender, $options: 'i' };
      match.receiverId = { $regex: receiverId, $options: 'i' };
      //match.reservationId = { $regex: reservationId, $options: 'i' };
      if (filterNotificationDto.filter.hasOwnProperty('is_read')) {
        
        const is_read = filterNotificationDto.filter.is_read;
        match.is_read = { $eq: is_read };
      }
      aggregate_options.push({ $match: match });
      /*   // Set up the aggregation

      const myAggregate = this.notificationModel.aggregate(aggregate_options);
      const notifications = await this.notificationModel.aggregatePaginate(myAggregate, options, null);
      return notifications; */
      //filter by date
      const sortOrderU = filterNotificationDto.sortOrder === 'desc' ? -1 : 1;
      
      aggregate_options.push({ $sort: { createdAt: sortOrderU } });
      const myAgregate = pagination(aggregate_options, options);
      const notifications = await this.notificationModel.aggregate(myAgregate);
      

      return notifications[0];
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
  async updateNotificationsByIds(ids: string[]) {
    
    try {
      await this.notificationModel.updateMany(
        {
          _id: {
            $in: ids
          }
        },
        {
          $set: { is_read: true }
        },
        {
          multi: true
        }
      );
      return true;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

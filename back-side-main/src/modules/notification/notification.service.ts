import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {filterNotificationDto} from './dto/filterNotification.dto';
import {NotificationDto} from './dto/notification.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Notification} from "../../entities/notification.entity";
import {INotificationModel} from "../../entities/notification.interface";
import {Expert} from "../../entities/expert.entity";
import {Model} from "mongoose";
import {Client} from "../../entities/client.entity";
import {Reservation} from "../../entities/reservation.entity";
import {SmsService} from "../../config/sms/sms.service";
import {MailerService} from "../../config/mailer/mailer.service";
import {NotificationGateway} from "./notification.gateway";
import {getHtml} from "../../config/mailer/mailer.helper";
import {ReservationStatus} from "../../entities/reservation.status.enum";
import {pagination} from "../../shared/pagination";
import moment = require('moment');
import 'moment/locale/fr';
import demandeRendezVous from "./htmlTemplates/demande-rendez-vous";
import acceptationRendezVous from "./htmlTemplates/accepation-rendez-vous";
import refusRendezVous from "./htmlTemplates/refus-rendez-vous";
import {GenericRepository} from "../../shared/generic.repository";

@Injectable()
export class NotificationService {

    private readonly expertRepository: GenericRepository<Expert>;
    private readonly clientRepository: GenericRepository<Client>;
    private readonly reservationRepository: GenericRepository<Reservation>;

    constructor(
        @InjectModel(Notification.name) private notificationModel: INotificationModel,
        @InjectModel(Expert.name) private expertModel: Model<Expert>,
        @InjectModel(Client.name) private clientModel: Model<Client>,
        @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
        private smsService: SmsService,
        private mailerService: MailerService,
        private notificationGateway: NotificationGateway
    ) {
        this.expertRepository = new GenericRepository<Expert>(expertModel);
        this.clientRepository = new GenericRepository<Client>(clientModel);
        this.reservationRepository = new GenericRepository<Reservation>(reservationModel);
    }

    async createNotification(notificationDto: NotificationDto) {
        try {
            let html;
            moment.locale('fr');

            const notification = new this.notificationModel(notificationDto);
            const expert = await this.expertRepository.findById(notificationDto.receiverId);
            const reservation = await this.reservationRepository.findById(notificationDto.reservationId);
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
                const html = await getHtml(demandeRendezVous(expert.fullName, client.fullName, reservation));

                await this.mailerService.sendMail(expert.email, expert.fullName, 'Une nouvelle mission en attente', html);
            } else {
                let statusFr = '';
                const expert = await this.expertRepository.findById(notificationDto.senderId);
                const client = await this.clientRepository.findById(notificationDto.receiverId);
                if (reservation.status === ReservationStatus.ACCEPTEE) {
                    html = await getHtml(acceptationRendezVous(expert.fullName, client.fullName, reservation.date));
                    expert.nb_missions = expert.nb_missions + 1;
                    await expert.save();
                    statusFr = 'acceptée';
                } else if (reservation.status === ReservationStatus.REFUSEE) {
                    html = await getHtml(refusRendezVous(expert.fullName, client.fullName));
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

            this.notificationGateway.server.emit('FromAPI', {...socketReponse, notif});
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
                collation: {locale: 'en'},
                customLabels: {
                    totalDocs: 'totalCount',
                    docs: 'entities'
                }
            };
            aggregate_options.push({
                $lookup: {from: 'reservations', localField: 'reservationId', foreignField: '_id', as: 'reservation'}
            });
            aggregate_options.push({
                $lookup: {from: fromSender, localField: 'sender', foreignField: '_id', as: 'sender'}
            });
            aggregate_options.push({
                $lookup: {from: fromReceiver, localField: 'receiver', foreignField: '_id', as: 'receiver'}
            });
            aggregate_options.push({
                $addFields: {
                    _id: {$toString: '$_id'},
                    receiverId: {$toString: '$receiverId'},
                    senderId: {$toString: '$senderId'}
                    //reservationId: { $toString: '$reservationId' },
                }
            });
            const {receiverId} = filterNotificationDto.filter;

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
            match.receiverId = {$regex: receiverId, $options: 'i'};
            //match.reservationId = { $regex: reservationId, $options: 'i' };
            if (filterNotificationDto.filter.hasOwnProperty('is_read')) {

                const is_read = filterNotificationDto.filter.is_read;
                match.is_read = {$eq: is_read};
            }
            aggregate_options.push({$match: match});
            /*   // Set up the aggregation

            const myAggregate = this.notificationModel.aggregate(aggregate_options);
            const notifications = await this.notificationModel.aggregatePaginate(myAggregate, options, null);
            return notifications; */
            //filter by date
            const sortOrderU = filterNotificationDto.sortOrder === 'desc' ? -1 : 1;

            aggregate_options.push({$sort: {createdAt: sortOrderU}});
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
                    $set: {is_read: true}
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
  async findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}

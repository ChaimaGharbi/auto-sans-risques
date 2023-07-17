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
import {MailerService} from "../../config/mailer/mailer.service";
import {NotificationGateway} from "./notification.gateway";
import {getHtml} from "../../config/mailer/mailer.helper";
import {ReservationStatus} from "../../entities/reservation.status.enum";
import 'moment/locale/fr';
import demandeRendezVous from "./htmlTemplates/demande-rendez-vous";
import acceptationRendezVous from "./htmlTemplates/accepation-rendez-vous";
import refusRendezVous from "./htmlTemplates/refus-rendez-vous";
import {GenericRepository} from "../../shared/generic/generic.repository";
import moment = require('moment');

@Injectable()
export class NotificationService {

    private readonly expertRepository: GenericRepository<Expert>;
    private readonly clientRepository: GenericRepository<Client>;
    private readonly reservationRepository: GenericRepository<Reservation>;
    private readonly notificationRepository: GenericRepository<Notification>;

    constructor(
        @InjectModel(Notification.name) private notificationModel: INotificationModel,
        @InjectModel(Expert.name) private expertModel: Model<Expert>,
        @InjectModel(Client.name) private clientModel: Model<Client>,
        @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
        private mailerService: MailerService,
        private notificationGateway: NotificationGateway
    ) {
        this.expertRepository = new GenericRepository<Expert>(expertModel);
        this.clientRepository = new GenericRepository<Client>(clientModel);
        this.reservationRepository = new GenericRepository<Reservation>(reservationModel);
        this.notificationRepository = new GenericRepository<Notification>(notificationModel);
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
            const fromSender = filterNotificationDto.role !== 'EXPERT' ? 'experts' : 'clients';
            const fromReceiver = filterNotificationDto.role == 'EXPERT' ? 'experts' : 'clients';
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
            return await this.notificationRepository.aggregate(filterNotificationDto, aggregate_options)
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

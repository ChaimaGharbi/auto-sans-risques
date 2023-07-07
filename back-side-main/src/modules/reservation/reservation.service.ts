import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {ReservationStatus} from 'src/entities/reservation.status.enum';
import {filterReservationDto} from './dto/filterReservation.dto';
import {reservationDto} from './dto/reservation.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Reservation} from "../../entities/reservation.entity";
import {Notification} from "../../entities/notification.entity";
import {IReservationModel} from "../../entities/reservation.interface";
import {INotificationModel} from "../../entities/notification.interface";
import {GenericRepository} from "../../shared/generic.repository";
import moment = require('moment');

@Injectable()
export class ReservationService {
  private readonly reservationRepository: GenericRepository<Reservation>
  private readonly notificationRepository: GenericRepository<Notification>;

  constructor(
      @InjectModel(Reservation.name) private reservationModel: IReservationModel,
      @InjectModel(Notification.name) private notificationModel: INotificationModel
      /* @InjectModel(Expert.name) private expertModel: Model<Expert>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
    private smsService: SmsService,
    private mailerService: MailerService,
    private reservationGateway: ReservationGateway */
  ) {
    this.reservationRepository = new GenericRepository(reservationModel)
    this.notificationRepository = new GenericRepository(notificationModel)
  }

  // TODO : see what is this function's role and consulting the commented code
  async _createNotification(receiver, sender, reservationId, message) {
    // try {
    //   let html;
    //   moment.locale('fr');

    return {
      receiver,
      sender,
      reservationId,
      message,
      ...await this.notificationRepository.create({
        receiverId: receiver,
        senderId: sender,
        reservationId,
        message,
        is_read: false
      })

    };
    //   const reservation = await this.reservationModel.findById(notificationDto.reservationId);
    //   let socketReponse = {};
    //   if (expert) {
    //     socketReponse = {
    //       userId: expert._id,
    //       message,
    //       reservation,
    //       client,
    //       expert
    //     };
    //
    // await this.smsService.sendSmsToPhone(notificationDto.message, parseInt(expert.tel));
    // const html = await getHtml(
    //   `<p>Bonjour ${expert.fullName},</p>\n` +
    //     '                        <p>\n' +
    //     `                          Vous avez une demande de rendez-vous par le client ${
    //       client.fullName
    //     } le ${moment(reservation.date).format('dddd DD MMMM YYYY à HH:mm')} pour un diagnostic ${
    //       reservation.reason !== 'Avisvente' ? "d'Achat" : 'du Vente'
    //     } d'une voiture ${
    //       reservation.typeCar
    //     }.\n <p> S.V.P. bien vouloir répondre OUI pour confirmer votre présence ou NON si vous ne pouvez pas vous présenter.</p>` +
    //     '                        </p>\n' +
    //     '                        <table\n' +
    //     '                          role="presentation"\n' +
    //     '                          border="0"\n' +
    //     '                          cellpadding="0"\n' +
    //     '                          cellspacing="0"\n' +
    //     '                          class="btn btn-primary"\n' +
    //     '                        >\n' +
    //     '                        </table>'
    // );
    // await this.mailerService.sendMail(expert.email, expert.fullName, 'Une nouvelle mission en attente', html);
    // } else {
    // let statusFr = '';
    // const expert = await this.expertModel.findById(notificationDto.senderId);
    // const client = await this.clientModel.findById(notificationDto.receiverId);
    // if (reservation.status === ReservationStatus.ACCEPTEE) {
    // html = await getHtml(
    //   `<p>Monsieur  ${client.fullName},</p>\n` +
    //     '                        <p>\n' +
    //     `                          L'expert ${
    //       expert.fullName
    //     } a accepté votre rendez-vous, veuillez être  à l'heure de votre RDV ${moment(reservation.date).format(
    //       'dddd DD MMMM YYYY à HH:mm'
    //     )}` +
    //     '                        </p>\n' +
    //     '                        <table\n' +
    //     '                          role="presentation"\n' +
    //     '                          border="0"\n' +
    //     '                          cellpadding="0"\n' +
    //     '                          cellspacing="0"\n' +
    //     '                          class="btn btn-primary"\n' +
    //     '                        >\n' +
    //     '                        </table>'
    // );
    // expert.nb_missions = expert.nb_missions + 1;
    // await expert.save();
    // statusFr = 'acceptée';
    // } else if (reservation.status === ReservationStatus.REFUSEE) {
    //   html = await getHtml(
    //     `<p>Monsieur  ${client.fullName},</p>\n` +
    //       '                        <p>\n' +
    //       `                          L'expert ${expert.fullName} n'est pas disponible pour le moment, merci de changer la date de reservation ou demander la disponibilité d'un autre expert.` +
    //       '                        </p>\n' +
    //       '                        <table\n' +
    //       '                          role="presentation"\n' +
    //       '                          border="0"\n' +
    //       '                          cellpadding="0"\n' +
    //       '                          cellspacing="0"\n' +
    //       '                          class="btn btn-primary"\n' +
    //       '                        >\n' +
    //       '                        </table>'
    //   );
    //   statusFr = 'refusée';
    // }
    // socketReponse = {
    //   userId: client._id,
    //   msg: notificationDto.message,
    //   reservation,
    //   client,
    //   expert
    // };
    // await this.smsService.sendSmsToPhone(notificationDto.message, parseInt(client.tel));
    // await this.mailerService.sendMail(client.email, client.fullName, `Votre mission a été ${statusFr}`, html);
    // }
    //
    // this.notificationGateway.server.emit('FromAPI', { ...socketReponse, notif });
    // return notif;
    // } catch (error) {
    // throw new InternalServerErrorException(error.message);
    // }
  }

  async createReservation(reservationDto: reservationDto, cb: (payload: any) => void) {
    try {
      const reservation = await this.reservationModel.create(reservationDto);

      const formatedDate = moment(reservationDto.date).utcOffset('+0100').format('dddd, D MMMM YYYY, HH:mm');

      const notification = await this._createNotification(
          reservationDto.expertId,
          reservationDto.clientId,
          reservation._id,
          `Le client ${reservationDto.fullName} demande votre assistance pour une mission de ${reservationDto.reason} pour la voiture ${reservationDto.typeCar} le ${formatedDate}, veuillez confirmer ou Annuler le RDV.`
      );

      cb(notification);

      return reservation;
    } catch (e: any) {
      throw new InternalServerErrorException("Echec d'obtenir un rendez-vous!");
    }
  }

  async fetchReservationsPaginate(filterReservationDto: filterReservationDto, group: any) {
    try {

        const aggregate_options: any[] = [
            {
                $lookup: {from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert'}
            },
            {
                $lookup: {from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client'}
            },
            {
                $addFields: {
                    _id: {$toString: '$_id'},
                    expertId: {$toString: '$expertId'},
                    clientId: {$toString: '$clientId'}
                }
            }
        ];
        if (group !== false && parseInt(group) !== 0) {
            const group = {
                _id: {$dateToString: {format: '%Y-%m-%d', date: '$date'}}, // Group By Expression
                data: {$push: '$$ROOT'}
            };

            aggregate_options.push({$group: group});
        }
        return await this.reservationRepository.aggregate(filterReservationDto, aggregate_options);

    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateReservationStatus(id: any, expertId: any, status: ReservationStatus, cb: (payload: any) => void) {
    try {
      const reservation = await this.reservationModel.findById(id).populate('expertId').lean();

      if (!reservation) {
        return new NotFoundException('No reservation found!');
      }

      await this.reservationModel.findByIdAndUpdate(id, {status});

      const fullname = reservation.expertId.fullName;

      const payload = await this._createNotification(
          reservation.clientId,
          reservation.expertId._id,
          id,
          `L'expert ${fullname} a ${status.toLowerCase()} votre demande de mission pour une mission de ${
              reservation.reason
          } pour la voiture ${reservation.typeCar}.`
      );

      await cb(payload);
      return {...reservation, expertId};
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async fetchReservationById(id, expertId) {
    try {
      const aggregate_options = [];

      aggregate_options.push({
        $lookup: {from: 'experts', localField: 'expertId', foreignField: '_id', as: 'expert'}
      });

      aggregate_options.push({
        $lookup: {from: 'clients', localField: 'clientId', foreignField: '_id', as: 'client'}
      });

      aggregate_options.push({
        $addFields: {
          _id: {$toString: '$_id'},
          expertId: {$toString: '$expertId'},
          clientId: {$toString: '$clientId'}
        }
      });

      aggregate_options.push({
        $addFields: {
          _id: {$toString: '$_id'},
          expertId: {$toString: '$expertId'},
          clientId: {$toString: '$clientId'}
        }
      });

      const match = {
        _id: {$regex: id, $options: 'i'},
        status: {$regex: 'ACCEPTEE', $options: 'i'},
        expertId: {$regex: expertId, $options: 'i'}
      };
      aggregate_options.push({$match: match});

      const reservation = await this.reservationModel.aggregate(aggregate_options);
      if (!reservation) {
        return null;
      }
      return reservation;
    } catch (e) {
      return null;
    }
  }

  async updateReservationsStatusByIds(ids: string[], etat: string) {
    try {
      // let status;
      // if (etat === 'annulé') {
      //   status = ReservationStatus.ANNULEE;
      // } else {
      //   status = ReservationStatus.EN_ATTENTE;
      // }
      // await this.reservationModel.updateMany(
      //   {
      //     _id: {
      //       $in: ids
      //     }
      //   },
      //   {
      //     $set: { status: status }
      //   }
      // );

      await this.reservationModel.updateMany(
          {
            _id: {
              $in: ids
            }
          },
          {
            $set: {
              status: etat as ReservationStatus
            }
          }
      );
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

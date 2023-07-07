import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Expert} from "../../entities/expert.entity";
import {IExpertModel} from "../../entities/expert.interface";
import {Client} from "../../entities/client.entity";
import {IClientModel} from "../../entities/client.interface";
import {Reservation} from "../../entities/reservation.entity";
import {IReservationModel} from "../../entities/reservation.interface";
import * as moment from "moment-timezone";
import {ReservationStatus} from "../../entities/reservation.status.enum";
// TODO :Understand The stats service
@Injectable()
export class StatsService {
  constructor(
      @InjectModel(Expert.name) private expertModel: IExpertModel,
      @InjectModel(Client.name) private clientModel: IClientModel,
      @InjectModel(Reservation.name) private reservationModel: IReservationModel
  ) {
  }

  getDataOfLast7days(data) {
    const today = moment().tz('Europe/Lisbon').tz('Europe/Lisbon').isoWeekday();

    const arrayData = [0, 0, 0, 0, 0, 0, 0]; //sunday-monday....
    //(1-Monday, 7-Sunday)
    data.forEach(x => {
      if (today == parseInt(x._id)) {
        arrayData[6] = x.count;
      }
      if (moment().tz('Europe/Lisbon').subtract(1, 'days').isoWeekday() == parseInt(x._id)) {
        arrayData[5] = x.count;
      }
      if (moment().tz('Europe/Lisbon').subtract(2, 'days').isoWeekday() == parseInt(x._id)) {
        arrayData[4] = x.count;
      }
      if (moment().tz('Europe/Lisbon').subtract(3, 'days').isoWeekday() == parseInt(x._id)) {
        arrayData[3] = x.count;
      }
      if (moment().tz('Europe/Lisbon').subtract(4, 'days').isoWeekday() == parseInt(x._id)) {
        arrayData[2] = x.count;
      }
      if (moment().tz('Europe/Lisbon').subtract(5, 'days').isoWeekday() == parseInt(x._id)) {
        arrayData[1] = x.count;
      }
      if (moment().tz('Europe/Lisbon').subtract(6, 'days').isoWeekday() == parseInt(x._id)) {
        arrayData[0] = x.count;
      }
    });
    return arrayData;
  }

  async getTodayWeekStats() {
    try {
      const d = moment().tz('Europe/Lisbon').tz('Europe/Lisbon').toDate();
      d.setDate(d.getDate() - 6);
      d.setHours(0, 59, 59, 59);


      const aggregate_options = [];

      interface IMatch {
        createdAt?: any;
      }

      const match: IMatch = {};
      match.createdAt = {$gt: d};
      aggregate_options.push({$match: match}, {$project: {salt: 0, hash: 0}});
      const group = {
        _id: {$dateToString: {format: '%u', date: '$createdAt', timezone: 'Europe/Lisbon'}}, // Group By Expression
        count: {$sum: 1}
      };
      aggregate_options.push({$group: group});

      const experts = await this.expertModel.find().countDocuments();
      const data = await this.expertModel.aggregate(aggregate_options);
      const expertsData = this.getDataOfLast7days(data);

      /////////////////////Revenue Widget/////////////
      const aggregate_options1 = [];

      interface IMatch {
        date?: any;
      }

      const match1: IMatch = {};
      match1.date = {$gt: d};
      /*aggregate_options1.push({ $match: match1 });

            let group1 = {
                _id: { $dateToString: { format: "%u", date: "$date", timezone: "Europe/Lisbon" } }, // Group By Expression
                count: { $sum: "$payout" },
            };
            aggregate_options1.push({ $group: group1 });

            const revenue = await CompletedOffer.aggregate([
                { $group: { _id: null, sum: { $sum: "$payout" } } },
            ]);

            const dataRevenue = await CompletedOffer.aggregate(aggregate_options1);
            const revenueData = getDataOfLast7days(dataRevenue);*/

      ///////////////////////////////////////////
      /////////////////////Rewards Widget/////////////
      const aggregate_options2 = [];

      interface IMatch2 {
        createdAt?: any;
      }

      const match2: IMatch2 = {};
      match2.createdAt = {$gt: d};
      aggregate_options2.push({$match: match2});
      const group2 = {
        _id: {$dateToString: {format: '%u', date: '$createdAt', timezone: 'Europe/Lisbon'}}, // Group By Expression
        count: {$sum: 1}
      };
      aggregate_options2.push({$group: group2});

      const clientsCount = await this.clientModel.find().countDocuments();

      const clientsAgg = await this.clientModel.aggregate(aggregate_options2);
      const clientsData = this.getDataOfLast7days(clientsAgg);

      /////////////////////Offers Widget/////////////
      const aggregate_options3 = [];

      interface IMatch3 {
        date?: any;
      }

      const match3: IMatch3 = {};
      match3.date = {$gt: d};
      aggregate_options3.push({$match: match3});
      const group3 = {
        _id: {$dateToString: {format: '%u', date: '$date', timezone: 'Europe/Lisbon'}}, // Group By Expression
        count: {$sum: 1}
      };
      aggregate_options3.push({$group: group3});

      const missions = await this.reservationModel.find().countDocuments();

      const missionsAgg = await this.reservationModel.aggregate(aggregate_options3);
      const missionsData = this.getDataOfLast7days(missionsAgg);

      ////////////Today Stats////////////////////////////////////////
      const startOfToday = moment().tz('Europe/Lisbon').tz('Europe/Lisbon').toDate();
      startOfToday.setHours(0, 0, 0, 0);


      /* const todayRevenue = await CompletedOffer.aggregate([
                { $match: { date: { $gt: startOfToday } } },
                { $group: { _id: null, sum: { $sum: "$payout" } } },
            ]);*/
      const todayClients = await this.clientModel.aggregate([
        {
          $match: {
            createdAt: {$gt: startOfToday}
          }
        },
        {$group: {_id: null, sum: {$sum: 1}}}
      ]);
      const todayExperts = await this.expertModel.aggregate([
        {$match: {createdAt: {$gt: startOfToday}}},
        {$group: {_id: null, sum: {$sum: 1}}}
      ]);
      const todayMissions = await this.reservationModel.aggregate([
        {
          $match: {
            date: {$gt: startOfToday}
          }
        },
        {$group: {_id: null, sum: {$sum: 1}}}
      ]);

      const etats = [
        ReservationStatus.EN_ATTENTE,
        ReservationStatus.ACCEPTEE,
        ReservationStatus.REFUSEE,
        ReservationStatus.COMPLETEE
      ];
      const missionsStatsPerEtat = [];
      for (let i = 0; i < etats.length; i++) {
        const num = await this.reservationModel.find({status: etats[i]}).countDocuments();
        missionsStatsPerEtat.push(num);
      }
      const cities = [
        'Ariana',
        'Béja',
        'Ben Arous',
        'Bizerte',
        'Gabès',
        'Gafsa',
        'Jendouba',
        'Kairouan',
        'Kasserine',
        'Kébili',
        'Le Kef',
        'Mahdia',
        'Manouba',
        'Médenine',
        'Monastir',
        'Nabeul',
        'Sfax',
        'Sidi Bouzid',
        'Siliana',
        'Sousse',
        'Tataouine',
        'Tozeur',
        'Zaghouan',
        'Tunis'
      ];
      const expertsStatsPerCity = [];
      for (let i = 0; i < cities.length; i++) {
        const num = await this.expertModel.find({ville: cities[i]}).countDocuments();
        expertsStatsPerCity.push(num);
      }

      const carsList = [
        'KIA',
        'Alfa Romeo',
        'Audi',
        'BMW',
        'Chery',
        'Chevrolet',
        'Citroen',
        'Dacia',
        'Fiat',
        'Ford',
        'Honda',
        'Hyndai',
        'Jaguar',
        'Jeep',
        'Land Rover',
        'Mahindra',
        'Mazda',
        'Peugeot',
        'Renault',
        'Porsche'
      ];
      const missionsStatsPerVoitures = [];
      for (let i = 0; i < carsList.length; i++) {
        const num = await this.reservationModel.find({typeCar: carsList[i]}).countDocuments();
        missionsStatsPerVoitures.push(num);
      }
      const top5ExpersSelonMissions = await this.expertModel.aggregate([{$sort: {nb_missions: -1}}, {$limit: 5}]);
      const top5ExpersSelonMissionsNoms = [];
      const top5ExpersSelonMissionsNbMissions = [];


      for (let i = 0; i < top5ExpersSelonMissions.length; i++) {
        top5ExpersSelonMissionsNoms.push(top5ExpersSelonMissions[i].fullName);
        top5ExpersSelonMissionsNbMissions.push(top5ExpersSelonMissions[i].nb_missions);
      }
      return {
        todayClients: todayClients[0] == undefined ? 0 : todayClients[0].sum,
        todayExperts: todayExperts[0] == undefined ? 0 : todayExperts[0].sum,
        todayMissions: todayMissions[0] == undefined ? 0 : todayMissions[0].sum,
        clientWidget: {
          clientsCount,
          clientsData
        },
        expertWidget: {
          experts,
          expertsData
        },
        missionsWidget: {
          missions,
          missionsData
        },
        missionsStatsPerEtat,
        expertsStatsPerCity,
        missionsStatsPerVoitures,
        top5ExpersSelonMissionsNoms,
        top5ExpersSelonMissionsNbMissions
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getMissionsStatsPerEtat() {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

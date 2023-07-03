import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expert } from 'src/entities/expert.entity';
import { Payment } from 'src/entities/payment.entity';
import * as crypto from 'crypto';
import { PaymentStatus } from 'src/entities/Payment.status.enum';
import { FilterPaymentDto } from 'src/modules/payment/dto/filterPayment.dto';
import { IPaymentModel } from 'src/entities/payment.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BullAdapter, setQueues } from 'bull-board';

export class PaymentRepository {
  constructor(
    @InjectModel(Expert.name) private expertModel: Model<Expert>,
    @InjectModel(Payment.name) private paymentModel: IPaymentModel,
    @InjectQueue('invoicejob') private readonly pdfQueue: Queue
  ) {
    setQueues([new BullAdapter(pdfQueue)]);
  }

  async handlePayment(data: any) {
    const y = data.orderProducts.split(': ');
    const missionToAdd = parseInt(y[1]);
    try {
      const hash = crypto
        .createHash('sha1')
        .update(data.TransStatus + data.PAYID + process.env.GPG_CHECKOUT_PASSWORD)
        .digest('hex');

      if (hash == data.Signature) {
        let payment;
        const exist = await this.paymentModel.findOne({ payId: data.PAYID });
        const expert = await this.expertModel.findOne({ email: data.EMAIL });
        if (exist) {
          payment = exist;
        } else {
          payment = new this.paymentModel({
            amount: data.TotalAmount / 1000,
            nb_missions: missionToAdd,
            payId: data.PAYID,
            expertId: expert._id
          });
        }
        if (data.TransStatus == '00') {
          const expert = await this.expertModel.findOne({ email: data.EMAIL });
          expert.credit = expert.credit + missionToAdd;
          await expert.save();
          await this.pdfQueue.add('invoice', {
            payment: data,
            userId: expert._id
          });
          payment.etat = PaymentStatus.COMPLETEE;
        } else if (data.TransStatus == '05') {
          payment.etat = PaymentStatus.REFUSEE;
        } else if (data.TransStatus == '06') {
          payment.etat = PaymentStatus.ANNULEE;
        } else if (data.TransStatus == '07' || data.TransStatus == '08') {
          payment.etat = PaymentStatus.Rembourse;
          expert.credit = expert.credit - missionToAdd;
          await expert.save();
        } else if (data.TransStatus == '08') {
          payment.etat = PaymentStatus.ChargeBack;
          expert.credit = expert.credit - missionToAdd;
          await expert.save();
        }
        await payment.save();
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchPayments(filterPaymentDto: FilterPaymentDto) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterPaymentDto.pageNumber,
        limit: filterPaymentDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $lookup: { from: 'factures', localField: 'factureId', foreignField: '_id', as: 'facture' }
      });

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' },
          expertId: { $toString: '$expertId' }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, etat, expertId } = filterPaymentDto.filter;
      interface IMatch {
        etat?: any;
        expertId?: any;
        _id?: any;
      }
      const match: IMatch = {};

      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (etat) match.etat = { $regex: etat, $options: 'i' };
      if (expertId) match.expertId = { $regex: expertId, $options: 'i' };

      //filter by date

      aggregate_options.push({ $match: match });

      //SORTING -- THIRD STAGE
      const sortOrderU = filterPaymentDto.sortField && filterPaymentDto.sortOrder === 'desc' ? -1 : 1;
      if (filterPaymentDto.sortField === 'date') {
        aggregate_options.push({ $sort: { date: sortOrderU } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.paymentModel.aggregate(aggregate_options);

      const payments = await this.paymentModel.aggregatePaginate(myAggregate, options, null);
      return payments;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

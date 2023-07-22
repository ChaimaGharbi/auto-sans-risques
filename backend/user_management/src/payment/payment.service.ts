import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {FilterPaymentDto} from './dto/filterPayment.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Payment} from "./entities/payment.entity";
import {IPaymentModel} from "./entities/payment.interface";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";
import {BullAdapter, setQueues} from "bull-board";
import crypto from "crypto";
import {PaymentStatus} from "./entities/Payment.status.enum";
import {GenericRepository} from "../shared/generic/generic.repository";
import paymentSort from "./payment-sort";
import {Expert} from "../expert/entities/expert.entity";

@Injectable()
export class PaymentService {
    private readonly paymentRepository: GenericRepository<Payment>

    constructor(
        @InjectModel(Expert.name) private expertModel: Model<Expert>,
        @InjectModel(Payment.name) private paymentModel: IPaymentModel,
        @InjectQueue('invoicejob') private readonly pdfQueue: Queue
    ) {
        setQueues([new BullAdapter(pdfQueue)]);
        this.paymentRepository = new GenericRepository<Payment>(paymentModel)
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
                const exist = await this.paymentModel.findOne({payId: data.PAYID});
                const expert = await this.expertModel.findOne({email: data.EMAIL});
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
                    const expert = await this.expertModel.findOne({email: data.EMAIL});
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
            return await this.paymentRepository.aggregate(filterPaymentDto, paymentSort);
        } catch (error) {
            return new InternalServerErrorException(error);
        }
    }
}

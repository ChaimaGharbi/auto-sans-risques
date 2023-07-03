import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/repositories/payment.repository';
import { FilterPaymentDto } from './dto/filterPayment.dto';

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  async handlePayment(data: any) {
    
    return this.paymentRepository.handlePayment(data);
  }

  async fetchPayments(filterPaymentDto: FilterPaymentDto) {
    return this.paymentRepository.fetchPayments(filterPaymentDto);
  }
}

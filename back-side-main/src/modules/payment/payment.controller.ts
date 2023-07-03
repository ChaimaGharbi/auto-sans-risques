import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilterPaymentDto } from './dto/filterPayment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  async handlePayment(@Body() data: any) {
    return this.paymentService.handlePayment(data);
  }

  @Post('/paginate')
  async fetchPayments(@Body() filterPaymentDto: FilterPaymentDto) {
    return this.paymentService.fetchPayments(filterPaymentDto);
  }
}

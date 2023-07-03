import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as axios from 'axios';

@Injectable()
export class SmsService {
  async sendSmsToPhone(smsTxt: string, phone: number) {
    try {
      const reponse = await axios.default.post(
        `http://41.226.169.210/API/sendsms.php?SPID=36&LOGIN=${process.env.SMS_USERNAME}&PASS=${process.env.SMS_PASSWORD}&SC=${process.env.SMS_SC}&TEXT=${smsTxt}&MOBILE=216${phone}`
      );
      return reponse.data;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

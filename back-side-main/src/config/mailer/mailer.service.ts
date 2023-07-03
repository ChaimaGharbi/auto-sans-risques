import { Injectable, InternalServerErrorException } from '@nestjs/common';


@Injectable()
export class MailerService {
  async sendMail(toEmail: string, toName: string, subject: string, html: string) {
  const mailjet = require('node-mailjet').connect(process.env.MAILER_KEY1, process.env.MAILER_KEY2);
  const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.FROM_EMAIL,
            Name: process.env.PLATFORM_NAME
          },
          To: [
            {
              Email: toEmail,
              Name: toName
            }
          ],
          Subject: subject,
          HTMLPart: html
        }
      ]
    });
    try {
      //
      //
      const res = await request;
      
      
    } catch (error) {
      

      throw new InternalServerErrorException(error);
    }
  }
}

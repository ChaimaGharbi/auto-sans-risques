import { Injectable } from '@nestjs/common';
import { getHtml } from 'src/config/mailer/mailer.helper';
import { MailerService } from 'src/config/mailer/mailer.service';
import { ContactRepository } from 'src/repositories/contact.repository';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository, private mailerService: MailerService) {}

  async sendContactUs(contactDto: any) {
    await this.contactRepository.createContact(contactDto);
    const html = await getHtml(contactDto.message);
    await this.mailerService.sendMail(
      process.env.FROM_EMAIL,
      contactDto.name,
      contactDto.subject + '  from ' + contactDto.email,
      html
    );
  }
}

import {Injectable} from '@nestjs/common';
import {getHtml} from 'src/config/mailer/mailer.helper';
import {MailerService} from 'src/config/mailer/mailer.service';
import {InjectModel} from "@nestjs/mongoose";
import {Contact} from "../../entities/contact.entity";
import {Model} from "mongoose";
import {GenericRepository} from "../../shared/generic/generic.repository";

@Injectable()
export class ContactService {
    private readonly contactRepository: GenericRepository<Contact>;

    constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>, private mailerService: MailerService) {
        this.contactRepository = new GenericRepository(contactModel);
    }

    async sendContactUs(contactDto: any) {
        await this.contactRepository.create(contactDto);
        const html = await getHtml(contactDto.message);
        await this.mailerService.sendMail(
            process.env.FROM_EMAIL,
            contactDto.name,
            contactDto.subject + '  from ' + contactDto.email,
            html
        );
    }
}

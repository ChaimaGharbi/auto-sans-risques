import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ContactController} from './contact.controller';
import {ContactService} from './contact.service';
import {Contact, ContactSchema} from './entities/contact.entity';
import {MailerService} from "../shared/mailer/mailer.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}])],
    controllers: [ContactController],
    providers: [ContactService, MailerService],
    exports: [ContactService]
})
export class ContactModule {
}

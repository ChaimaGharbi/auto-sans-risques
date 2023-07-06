import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from 'src/modules/contact/contact.controller';
import { ContactService } from 'src/modules/contact/contact.service';
import { Contact, ContactSchema } from 'src/entities/contact.entity';
import { MailerService } from 'src/config/mailer/mailer.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}])],
    controllers: [ContactController],
    providers: [ContactService, MailerService],
    exports: [ContactService]
})
export class ContactModule {}

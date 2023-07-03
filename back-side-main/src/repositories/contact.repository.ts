import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/entities/contact.entity';

export class ContactRepository {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  async createContact(contact: Contact): Promise<Contact> {
    try {
      const newContact = new this.contactModel(contact);
      return await newContact.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

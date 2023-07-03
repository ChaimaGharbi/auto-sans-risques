import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('/')
  async sendMessage(@Body() body: ContactDto) {
    return await this.contactService.sendContactUs(body);
  }
}

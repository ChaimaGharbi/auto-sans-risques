import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/repositories/client.repository';
import { ClientDto } from './dto/client.dto';
import { filterClientDto } from './dto/filterClient.dto';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async fetchClients(filterClientDto: filterClientDto) {
    return this.clientRepository.fetchClients(filterClientDto);
  }

  async fetchClientId(id: any) {
    return this.clientRepository.fetchClientId(id);
  }

  async updateClientsStatus(ids: any, status: number) {
    return this.clientRepository.updateClientsStatus(ids, status);
  }

  async updateClient(id: any, clientDto: any) {
    return this.clientRepository.updateClientsData(id, clientDto);
  }
}

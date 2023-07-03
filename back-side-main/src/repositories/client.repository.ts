import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from 'src/entities/client.entity';
import { IClientModel } from 'src/entities/client.interface';
import { ClientDto } from 'src/modules/client/dto/client.dto';
import { filterClientDto } from 'src/modules/client/dto/filterClient.dto';

function equalArrays(first, second) {
  if (first.length !== second.length) return false;
  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) return false;
  }
  return true;
}

function pick(v, old) {
  if (!Array.isArray(v)) {
    if (v && v !== old) {
      return v;
    }
  } else {
    if (v && !equalArrays(v, old)) {
      return v;
    }
  }
  return old;
}

export class ClientRepository {
  constructor(@InjectModel(Client.name) private clientModel: IClientModel) {}

  async fetchClients(filterClientDto: filterClientDto) {
    try {
      const aggregate_options = [];

      const options = {
        page: filterClientDto.pageNumber,
        limit: filterClientDto.pageSize,
        collation: { locale: 'en' },
        customLabels: {
          totalDocs: 'totalCount',
          docs: 'entities'
        }
      };

      aggregate_options.push({
        $project: {
          salt: 0,
          password: 0,
          roles: 0,
          carteFiscale: 0,
          cin: 0,
          diplome: 0,
          signature: 0,
          photoAtelier: 0
        }
      });

      aggregate_options.push({
        $addFields: {
          _id: { $toString: '$_id' },
          adresse: { $concat: ['$adresse', ' ', '$ville'] },
          specialite: {
            $reduce: {
              input: '$specialite',
              initialValue: '',
              in: {
                $concat: [
                  '$$value',
                  {
                    $cond: {
                      if: {
                        $eq: ['$$value', '']
                      },
                      then: '',
                      else: ', '
                    }
                  },
                  '$$this'
                ]
              }
            }
          }
        }
      });

      //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
      const { _id, email, address, tel, fullName, status } = filterClientDto.filter;
      interface IMatch {
        _id?: any;
        email?: any;
        adresse?: any;
        tel?: any;
        fullName?: any;
        status?: any;
        dispos?: any;
      }
      const match: IMatch = {};
      //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
      if (_id) match._id = { $regex: _id, $options: 'i' };
      if (email) match.email = { $regex: email, $options: 'i' };
      if (tel) match.tel = { $regex: tel, $options: 'i' };
      if (address) {
        match.adresse = { $regex: address, $options: 'i' };
      }
      
      if (status >= 0) {
        match.status = { $eq: status };
      }
      if (fullName) match.fullName = { $regex: fullName, $options: 'i' };
      //filter by date
      

      aggregate_options.push({ $match: match });

      //GROUPING -- SECOND STAGE

      //SORTING -- THIRD STAGE
      const sortOrderU = filterClientDto.sortField && filterClientDto.sortOrder === 'desc' ? -1 : 1;
      if (filterClientDto.sortField === 'createdAt') {
        aggregate_options.push({ $sort: { createdAt: sortOrderU } });
      } else if (filterClientDto.sortField === 'fullName') {
        aggregate_options.push({ $sort: { fullName: 1 } });
      } else {
        aggregate_options.push({ $sort: { _id: sortOrderU } });
      }

      //LOOKUP/JOIN -- FOURTH STAGE
      // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

      // Set up the aggregation
      const myAggregate = this.clientModel.aggregate(aggregate_options);

      const clients = await this.clientModel.aggregatePaginate(myAggregate, options, null);
      return clients;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async fetchClientId(id: any) {
    try {
      const client = await this.clientModel.findById(id);
      if (!client) {
        return new NotFoundException();
      } else return client;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateClient(id: any, clientDto: any) {
    try {
      const client = await this.clientModel.findById(id);
      if (!client) {
        return new NotFoundException('No client found');
      }
      client.status = clientDto.status;
      client.isVerified = clientDto.isVerified;
      await client.save();
      return client;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateClientsData(id: any, clientDto: any) {
    try {
      const client = await this.clientModel.findById(id);
      if (!client) {
        return new NotFoundException('No client found');
      }
      client.fullName = pick(clientDto.fullName, client.fullName);
      client.img = pick(clientDto.img, client.img);
      client.tel = pick(clientDto.tel, client.tel);
      client.adresse = pick(clientDto.adresse, client.adresse);
      client.ville = pick(clientDto.ville, client.ville);
      await client.save();
      return client;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateClientsStatus(ids: string[], status: number) {
    try {
      await this.clientModel.updateMany(
        {
          _id: {
            $in: ids
          }
        },
        {
          $set: { status: status }
        }
      );
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }
}

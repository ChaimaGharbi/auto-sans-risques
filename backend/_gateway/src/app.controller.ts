import {All, Controller, Get, Req, Res} from '@nestjs/common';
import axios from "axios";
import {Request} from 'express';


@Controller()
export class AppController {
  constructor(
      // @Inject('ADMIN') private adminClient: ClientProxy,
      // @Inject('COMMUNICATION') private communicationClient: ClientProxy,
      // @Inject('DIAGNOSIS') private diagnosisClient: ClientProxy,
      // @Inject('LISTING') private listingClient: ClientProxy,
      // @Inject('PAYMENT') private paymentClient: ClientProxy,
      // @Inject('USER_MANAGEMENT') private userManagementClient: ClientProxy,
  ) {
  }

  @Get("/")
  async getHello() {
    return "Hello World!";
  }

  @All('*')
  async redirectRequests(@Req() request: Request, @Res() response) {
    let host = 'localhost';
    let port = 8001;
    console.log(request.headers)
    const {url, method, body, query, headers} = request;
    switch (request.url.split('/')[1]) {
      case 'admin':
        host = 'localhost';
        port = 8001;
        break
      case 'pack':
      case 'contact':
      case 'assistance':
      case 'article':
      case 'ads':
        host = 'localhost';
        port = 8002;
        break
      case 'reservation':
      case 'reclamation':
      case 'rapport':
      case 'avis':
        host = 'localhost';
        port = 8003;
        break
      case 'payment':
      case 'expert':
      case 'client':
      case 'auth':
      case 'disponibilte' :
        host = 'localhost';
        port = 8004;
        break
    }
    const requestOptions = {
      method,
      url: `http://${host}:${port}` + url,
      params: query,
      data: body,
      headers
    };
    try {
      const resp = await axios(requestOptions);
      return response.status(resp.status).send(resp.data);
    } catch (e) {
      return response.status(e.response.status).send(e.response.data);
    }

  }
}

import {All, Controller, Get, Inject, Req, Res} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import axios from "axios";

@Controller()
export class AppController {
  constructor(
      @Inject('ADMIN') private adminClient: ClientProxy,
      @Inject('COMMUNICATION') private communicationClient: ClientProxy,
      @Inject('DIAGNOSIS') private diagnosisClient: ClientProxy,
      @Inject('LISTING') private listingClient: ClientProxy,
      @Inject('PAYMENT') private paymentClient: ClientProxy,
      @Inject('USER_MANAGEMENT') private userManagementClient: ClientProxy,
  ) {
  }

  @Get("/")
  async getHello() {
    return "Hello World!";
  }

  @All('*')
  async redirectRequests(@Req() request, @Res() response) {
    let host = 'localhost';
    let port = 8001;
    const {url, method, body, query} = request;
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
      case 'listing':
        host = 'localhost';
        port = 8004;
        break
      case 'payment':
        host = 'localhost';
        port = 8005;
        break
      case 'expert':
      case 'client':
      case 'auth':
        host = 'localhost';
        port = 8006;
        break
    }
    const requestOptions = {
      method,
      url: `http://${host}:${port}` + url,
      params: query,
      data: body,
    };
    try {
      const resp = await axios(requestOptions);
      return response.send(resp.data);
    } catch (e) {
      return response.send(e.response.data);
    }

  }
}

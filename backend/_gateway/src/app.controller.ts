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
    let host = 'admin';
    let port = 8001;
    const {url, method, body, query, headers} = request;
    switch (request.url.split('/')[1]) {
      case 'admin':
        host = 'admin';
        port = 8001;
        break
      case 'pack':
      case 'contact':
      case 'assistance':
      case 'article':
      case 'ads':
        host = 'communication';
        port = 8002;
        break
      case 'reservation':
      case 'reclamation':
      case 'rapport':
      case 'avis':
        host = 'diagnosis';
        port = 8003;
        break
      case 'payment':
      case 'expert':
      case 'client':
      case 'auth':
      case 'disponibilte' :
        host = 'user_management';
        port = 8004;
        break
    }
    const requestOptions = {
      method,
      url: `http://${host}:${port}` + url,
      params: query,
      data: body,
      headers: {
        "Content-Type": 'application/json',
      }
    };
    if (headers.authorization) {
      requestOptions['headers']["Authorization"] = headers.authorization
    }
    try {
      const resp = await axios(requestOptions);
      console.log("resp", resp)
      return response.status(resp.status).send(resp.data);
    } catch (e) {
      console.log("e", e)
      try {
        return response.status(e.response.status).send(e.response.data);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AdsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AdsGateway');

  afterInit(server: any) {
    this.logger.log(`on init`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`AdsGateway Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`AdsGateway Client connected: ${client.id}`);
  }
}

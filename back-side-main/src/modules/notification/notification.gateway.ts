import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificationGateway');

  afterInit(server: any) {
    this.logger.log(`on init`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`NotificationGateway Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`NotificationGateway Client connected: ${client.id}`);
  }
}

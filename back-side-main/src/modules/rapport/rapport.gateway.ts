import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { registerUser, unregisterUser } from 'src/shared/redis';
import { JwtHandlerCzIHateDI } from '../auth/jwt-strategy';

@WebSocketGateway()
export class RapportGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  jwt: JwtHandlerCzIHateDI;

  private logger: Logger = new Logger('RapportGateway');

  constructor() {
    this.jwt = new JwtHandlerCzIHateDI();
  }

  afterInit() {
    this.logger.log(`on init`);
  }
  private async getUserFromToken(client: Socket) {
    const token = client.handshake.query.token || '';
    if (!token) return null;
    const user: any = await this.jwt.validate(token);
    if (!user) return null;
    const id = user.id;
    if (!id) return null;
    return id;
  }

  async handleDisconnect(client: Socket) {
    try {
      const id = await this.getUserFromToken(client);
      if (id) {
        await unregisterUser(id);
      }
    } catch (e) {
      this.logger.error(`api:login ${e}`);
    }
  }

  async handleConnection(client: Socket) {
    try {
      const id = await this.getUserFromToken(client);
      if (!id) return;
      await registerUser(id, client.id);
    } catch (e) {
      this.logger.error(`api:login ${e}`);
    }
  }
}

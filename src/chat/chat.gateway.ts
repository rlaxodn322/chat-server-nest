/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from './dto/add-message.dto';
import { Logger } from '@nestjs/common';

// WebSocketGateway 데코레이터는 WebSocket 서버를 설정하며, CORS를 활성화하여 모든 도메인에서 접속 가능하도록 설정
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // socket.io 서버 객체
  // NestJS Logger를 사용하여 로깅 기능을 제공
  private logger = new Logger('ChatGateway');
  @SubscribeMessage('chat')
  handleMessage(@MessageBody() payload: AddMessageDto): AddMessageDto {
    this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
    this.server.emit('chat', payload);
    return payload;
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}

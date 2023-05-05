import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'block',
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() nsp: Namespace;
  private logger = new Logger('Gateway');

  // 초기화 이후에 실행
  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      this.logger.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.nsp.adapter.on('leave-room', (room, id) => {
      this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });

    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  // 소켓이 연결되면 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    socket.on('join-room', (room: string) => {
      socket.join(room);
      this.logger.log(
        `"Socket:${socket.id}"이 "Room:${room}"에 참여하였습니다.`,
      );
    });

    socket.on('leave-room', (room: string) => {
      socket.leave(room);
      this.logger.log(`"Socket:${socket.id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    socket.on('changeBlock', (room: string, blockId: string) => {
      // this.logger.log(`${room}의 ${blockId}변경`);
      socket.to(room).emit('changeBlock', blockId);
    });

    socket.on('addBlock', (room: string, blockId: string) => {
      this.logger.log(`${room}의 ${blockId}추가`);
      socket.to(room).emit('addBlock', blockId);
    });
  }

  // 소켓 연결이 끊기면 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {}
}

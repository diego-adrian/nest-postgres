import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ZoomService {

  private users: { [key: string]: string } = {};


  handleConnection(client: Socket) {
    console.log('client connected', client.id);
  }
  
  handleDisconnect(client: Socket) {
    delete this.users[client.id];
    console.log('client disconnect', client.id);
  }

  setUsers(data: { user: string }, client: Socket): void {
    this.users[client.id] = data.user;
  }

  getUsers(): { [key: string]: string } {
    return this.users;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { ChatSocket } from '../sockets/chat.socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
/*
  constructor(private socket: ChatSocket) { }


  connectSocket(): void {
    this.socket.connect()
  }

  sendMessage(message: Message): void {
    this.socket.emit('newMessageServer',message)
  }

  onNewMessage(): Observable<Message> {
    return this.socket.fromEvent('newMessageClient')
  }*/
}

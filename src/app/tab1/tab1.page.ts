import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private chatService: ChatService) {}

  messages: Message[] = [];

  ngOnInit(): void {
    //this.chatService.connectSocket();
    //this.chatService.onNewMessage().subscribe((message:Message) => this.messages.push(message))
  }

  sendMessage(message: string | number): void {
    console.log('sending' + message);
    //this.chatService.sendMessage({sender: 'alvaro',content: message as string,date: 'aa'})
  }
}

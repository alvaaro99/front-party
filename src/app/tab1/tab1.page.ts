import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Message } from '../models/message';
import { UserService } from '../services/user.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(
    public chatService: ChatService,
    private userService: UserService
  ) {}

  messages: Message[] = [];
  @ViewChild('listMessages') listMessages: any;

  ngOnInit(): void {
    this.chatService.connectSocket();
    this.chatService.onNewMessage().subscribe((message: Message) => {
      this.messages.push(message);
      this.scrollBottomList();
    });
  }

  scrollBottomList() {
    setTimeout(
      () => this.listMessages.el.scrollTo(0, this.listMessages.el.scrollHeight),
      10
    );
  }

  sendMessage(message: string | number): void {
    this.chatService.sendMessage({
      sender: this.userService.myUser,
      content: message as string,
      date: new Date(),
    });
  }
}

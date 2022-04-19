import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
})
export class MessageBubbleComponent implements OnInit {
  constructor(private userService: UserService) {}

  @Input() message: Message;
  sentByMe: boolean = false;

  ngOnInit() {
    this.sentByMe =
      this.userService.myUser.id === this.message.sender.id ? true : false;
  }
}

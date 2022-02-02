import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class ChatSocket extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000/chat', options: {} });
  }
}
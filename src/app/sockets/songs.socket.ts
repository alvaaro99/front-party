import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable()
export class SongsSocket extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000/songs', options: {} });
  }
}
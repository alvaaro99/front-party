import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const configSocket: SocketIoConfig = { url: 'http://localhost:3000', options: {}, };

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SocketIoModule.forRoot(configSocket)
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}

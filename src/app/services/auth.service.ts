import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage) {}

  async isUserLogged(): Promise<boolean> {
    const token = await this.storage.get('access_token');
    if (token) {
      return true;
    }
    return false;
  }
}

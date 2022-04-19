import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storage: Storage) {
    this.getMyUser();
  }

  myUser: User;

  async getMyUser() {
    const token = await this.storage.get('access_token');
    return this.http
      .get(environment.backUrl + '/users/me', {
        headers: { Authorization: token },
      })
      .subscribe((user: User) => (this.myUser = user));
  }

  async changePassword(oldPassword, newPassword) {
    const token = await this.storage.get('access_token');
    return this.http.put(
      environment.backUrl + '/users/changePassword',
      { oldPassword, newPassword },
      {
        headers: { Authorization: token },
      }
    );
  }

  logout() {
    return this.storage.remove('access_token');
  }
}

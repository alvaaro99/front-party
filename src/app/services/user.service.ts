import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storage: Storage) {}

  async getMyUser() {
    const token = await this.storage.get('access_token');
    return this.http.get(environment.backUrl + '/users/me', {
      headers: { Authorization: token },
    });
  }
}

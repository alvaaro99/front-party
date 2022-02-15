import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage, private http: HttpClient) {}

  async isUserLogged(): Promise<boolean> {
    const token = await this.storage.get('access_token');
    if (token && (await this.validateToken(token))) {
      return true;
    }
    return false;
  }

  async validateToken(token) {
    return this.http
      .get(`${environment.backUrl}/auth/logged`, {
        headers: { Authorization: token },
      })
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
}

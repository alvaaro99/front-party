import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserLoginDto } from 'src/app/models/userLogin.dto';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}

  login(user: UserLoginDto) {
    return this.http
      .post(`${environment.backUrl}/auth/login`, user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        tap((response) => {
          this.storage.set(
            'access_token',
            `Bearer ${response['access_token']}`
          );
        }),
        tap(() => {
          this.router.navigateByUrl('');
        })
      );
  }
}

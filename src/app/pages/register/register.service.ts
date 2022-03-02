import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';
import { UserRegisterDto } from 'src/app/models/userRegister.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}

  register(user: UserRegisterDto) {
    return this.http
      .post(`${environment.backUrl}/auth/register`, user, {
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

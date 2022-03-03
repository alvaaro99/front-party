import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserLoginDto } from 'src/app/models/userLogin.dto';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public alertController: AlertController,
    private translateService: TranslateService
  ) {}

  public userToLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit() {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('incorrectCredentials'),
      message: this.translateService.instant('tryAgain'),
      buttons: ['OK'],
    });

    await alert.present();
  }

  login() {
    this.loginService.login(this.userToLogin.value as UserLoginDto).subscribe({
      error: async (err) => {
        if (err.status == 401) this.showAlert();
      },
    });
  }
}

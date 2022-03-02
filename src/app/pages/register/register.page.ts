import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmedValidator } from 'src/app/validators/confirm-password.validator';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    public alertController: AlertController,
    private translateService: TranslateService
  ) {}

  public userToRegister: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      repeatPassword: ['', Validators.required],
    },
    {
      validator: ConfirmedValidator('password', 'repeatPassword'),
    }
  );

  ngOnInit() {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('emailAlreadyRegistered'),
      message: this.translateService.instant('tryOtherEmail'),
      buttons: ['OK'],
    });

    await alert.present();
  }

  register() {
    const { repeatPassword, ...newUser } = this.userToRegister.value;
    this.registerService.register(newUser).subscribe({
      error: async (err) => {
        if (err.error.statusCode == 400) this.showAlert();
      },
    });
  }
}

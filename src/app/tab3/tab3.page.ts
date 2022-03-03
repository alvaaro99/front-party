import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    public translateService: TranslateService
  ) {}

  user: User = { name: 'NAME', email: 'EMAIL' };

  ngOnInit(): void {
    this.userService
      .getMyUser()
      .then((obs$) => obs$.subscribe((user: User) => (this.user = user)));
  }

  async showAlertChangePassword() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('changePassword'),
      message: this.translateService.instant('sureChangePassword'),
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: this.translateService.instant('oldPassword'),
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: this.translateService.instant('newPassword'),
        },
        {
          name: 'confirmNewPassword',
          type: 'password',
          placeholder: this.translateService.instant('confirmNewPassword'),
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          id: 'cancel-button',
        },
        {
          text: this.translateService.instant('change'),
          role: 'OK',
          id: 'confirm-button',
          handler: (values) => this.handleChangePassword(values),
        },
      ],
    });
    await alert.present();
  }

  async incorrectPassword() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('incorrectPassword'),
      message: this.translateService.instant('incorrectPasswordExplain'),
      buttons: ['OK'],
    });
    await alert.present();
  }

  async passwordChanged() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('passwordChanged'),
      message: this.translateService.instant('passwordChangedExplained'),
      buttons: ['OK'],
    });
    await alert.present();
  }

  async newPasswordNotEquals() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('tryAgain'),
      message: this.translateService.instant('passwordsNotEquals'),
      buttons: ['OK'],
    });
    await alert.present();
  }

  async invalidPassword() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('incorrectPassword'),
      message: this.translateService.instant('passwordRequisites'),
      buttons: ['OK'],
    });
    await alert.present();
  }

  async passwordCanBeEquals() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('incorrectPassword'),
      message: this.translateService.instant('oldAndNewPasswordCantBeEquals'),
      buttons: ['OK'],
    });
    await alert.present();
  }

  handleChangePassword({ oldPassword, newPassword, confirmNewPassword }) {
    if (newPassword !== confirmNewPassword) return this.newPasswordNotEquals();
    if (!this.isValidPassword(newPassword)) return this.invalidPassword();
    if (oldPassword === newPassword) return this.passwordCanBeEquals();
    this.userService.changePassword(oldPassword, newPassword).then((obs$) => {
      obs$.subscribe(
        () => this.passwordChanged(),
        () => this.incorrectPassword()
      );
    });
  }

  private isValidPassword(password) {
    return password.length >= 3;
  }

  logout() {
    this.userService.logout().then(() => {
      this.router.navigateByUrl('/home');
    });
  }
}

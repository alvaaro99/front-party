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

  async simpleAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  handleChangePassword({ oldPassword, newPassword, confirmNewPassword }) {
    if (newPassword !== confirmNewPassword)
      return this.simpleAlert(
        this.translateService.instant('tryAgain'),
        this.translateService.instant('passwordsNotEquals')
      );
    if (!this.isValidPassword(newPassword))
      return this.simpleAlert(
        this.translateService.instant('incorrectPassword'),
        this.translateService.instant('passwordRequisites')
      );
    if (oldPassword === newPassword)
      return this.simpleAlert(
        this.translateService.instant('incorrectPassword'),
        this.translateService.instant('oldAndNewPasswordCantBeEquals')
      );
    this.userService.changePassword(oldPassword, newPassword).then((obs$) => {
      obs$.subscribe(
        () =>
          this.simpleAlert(
            this.translateService.instant('passwordChanged'),
            this.translateService.instant('passwordChangedExplained')
          ),
        () =>
          this.simpleAlert(
            this.translateService.instant('incorrectPassword'),
            this.translateService.instant('incorrectPasswordExplain')
          )
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

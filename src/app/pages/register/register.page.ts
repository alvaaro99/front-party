import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterDto } from 'src/app/models/userRegister.dto';
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
    private registerService: RegisterService
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

  register() {
    const { repeatPassword, ...newUser } = this.userToRegister.value;
    this.registerService.register(newUser);
  }
}

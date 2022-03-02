import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getMyUser()
      .then((obs$) => obs$.subscribe((user: User) => (this.user = user)));
  }

  user: User = { name: 'NAME', email: 'EMAIL' };
}

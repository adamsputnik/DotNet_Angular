import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  Login() {
    this.authService.Login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in Successfully'); }, error => {
          this.alertify.error(error);
        });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  Logout() {
    localStorage.removeItem('token');
  }

}

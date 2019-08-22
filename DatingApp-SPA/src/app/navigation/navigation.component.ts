import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  Login() {
    this.authService.Login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in Successfully'); }, error => {
          this.alertify.error(error);
        }, () => {
          this.router.navigate(['/members']);
        });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  Logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}

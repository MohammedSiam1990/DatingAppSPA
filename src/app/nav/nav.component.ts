import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginModel: any = {};
  registerModel: any = {};
  @Output() cancelRegister = new EventEmitter();
  constructor(public authService: AuthService , private  alertify: AlertifyService) {}
  ngOnInit() {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      next => {
        this.alertify.success('Logged in succssefully');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token; OR
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

  register() {
    this.authService.register(this.registerModel).subscribe(() => {
      this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.loginModel.username = '';
    this.loginModel.password = '';
    this.registerModel.username = '';
    this.registerModel.password = '';
    this.registerModel.repassword = '';
    console.log(this.registerModel);
    console.log('cancelled');
  }
}
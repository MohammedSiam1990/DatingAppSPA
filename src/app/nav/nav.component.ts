import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginModel: any = {};
  registerModel: any = {};
  @Output() cancelRegister = new EventEmitter();
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      next => {
        console.log('Logged in succssefully');
      },
      error => {
        console.log('Failed to login');
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

  register() {
    this.authService.register(this.registerModel).subscribe(() => {
      console.log('Registration successful');
    }, error => {
      console.log(error);
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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginModel: any = {};
  registerModel: any = {};
  display: any ;
  @Output() cancelRegister = new EventEmitter();
  constructor(public authService: AuthService , private  alertify: AlertifyService , private router: Router) {}
  ngOnInit() {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      next => {
        this.alertify.success('Logged in succssefully');
        // this.display = 'block';
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/member-list']);
        this.display = 'none';
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
    this.router.navigate(['/home']);
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

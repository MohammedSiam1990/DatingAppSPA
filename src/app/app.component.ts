import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DatingSPA';
  public textDir: string;
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, public translate: TranslateService) {}
  ngOnInit() {
    // tslint:disable-next-line: no-debugger
    debugger;
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      console.log(this.authService.decodedToken);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
    if (localStorage.getItem('textDir') === 'ar') {
        this.textDir = 'rtl';
        console.log(this.textDir);
      } else {
        this.textDir = 'ltr';
      }
  }
}

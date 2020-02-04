import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { User } from '../models/user';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginModel: any = {};
  // registerModel: any = {};
  user: User;
  display: any;
  photoUrl: string;
  textDir: string;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang === 'ar') {
        this.textDir = 'rtl';
        localStorage.setItem('textDir', 'ar');
      } else {
        this.textDir = 'ltr';
        localStorage.setItem('textDir', 'en');
      }
    });
  }
  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      photoUrl => (this.photoUrl = photoUrl)
    );
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator); OR The Best Using the Reactive Forms FormBuilder Service
    this.createRegisterForm(); // This is the Reactive Forms FormBuilder Service
  }
  createRegisterForm() {
    console.log('Test1');
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

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
        // To Reload Page
        window.location.assign('http://localhost:4200/member-list');
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
          if (event.lang === 'ar') {
            this.textDir = 'rtl';
            localStorage.setItem('textDir', 'ar');
          } else {
            this.textDir = 'ltr';
            localStorage.setItem('textDir', 'en');
          }
        });
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
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  register() {
    console.log('start');
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Registration successful');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/member-list']);
          });
        }
      );
    }
    // this.authService.register(this.registerModel).subscribe(() => {
    //   this.alertify.success('Registration successful');
    // }, error => {
    //   this.alertify.error(error);
    // });

    // console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.loginModel.username = '';
    this.loginModel.password = '';
    // this.registerModel.username = '';
    // this.registerModel.password = '';
    // this.registerModel.repassword = '';
    // OR This to Empty Filed
    this.registerForm = this.fb.group({
      username: '',
      password: '',
      confirmPassword: '',
      knownAs: '',
      dateOfBirth: '',
      city: '',
      country: ''
    });
  }
}

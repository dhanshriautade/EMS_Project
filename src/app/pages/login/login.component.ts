import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, RequiredValidator, EmailValidator } from '@angular/forms';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { Services } from 'app/service/service.service';
import { Router } from '@angular/router';
import { Session } from 'app/service/session.session';

declare const gapi: any;

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [AuthService]
})

export class Login implements AfterViewInit {
  loginauth = {
    password: null,
    Email: null,
    googlecheck: false
  };
  private clientId: string = '994730301081-dut9uvargechiodfnei2m53tude8dfhe.apps.googleusercontent.com';
  public auth2: any;
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(public session: Session, public router: Router, public service: Services, fb: FormBuilder, private element: ElementRef, public fblogin: FacebookService) {
    fblogin.init({
      appId: '136134157185050',
      cookie: true,  // enable cookies to allow the server to access 
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.8
    });
    this.session.clear();
    this.form = fb.group({
      'email': [ 'null', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.loginauth.googlecheck = false;
    if (this.form.valid) {
      this.service.authenticate(this.loginauth).subscribe(res => {
        if (res.success) {
          console.log(res);
          this.session.createSession(res.user, res.token);
          this.router.navigate(['pages/dashboard']);
        } else {
          console.log(res);
        }
      })
    }
  }

  loginWithFacebook(): void {
    this.loginauth.googlecheck = false;
    const options: LoginOptions = {
      scope: 'email,public_profile,user_about_me,user_birthday,user_location',
      return_scopes: true,
      enable_profile_selector: true
    };

    this.fblogin.login()
      .then((response: LoginResponse) => {
        console.log(response);
      })
      .catch((error: any) => console.error(error));
  }

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.loginauth.googlecheck = false;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        this.loginauth.Email = profile.getEmail();
        this.loginauth.password = profile.getId();
        this.loginauth.googlecheck = true;
        this.service.authenticate(this.loginauth).subscribe(res => {
          if (res.success) {
            console.log(res);
            this.session.createSession(res.user, res.token);
            this.router.navigate(['pages/dashboard']);
          } else {
            console.log(res);
          }
        })
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
        this.loginauth.googlecheck = false;
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit() {
  }
}

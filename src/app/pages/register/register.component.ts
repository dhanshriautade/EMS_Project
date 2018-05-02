import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { ElementRef, AfterViewInit } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';
import { Services } from 'app/service/service.service';
import { Router } from '@angular/router';
declare const gapi: any;

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements AfterViewInit {
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
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public submitted: boolean = false;
  register = {
    FullName: null,
    Email: null,
    password: null,
    repassword: null,
    profileUrl: null,
    googlechecker: false
  };
  constructor(private router: Router, private services: Services, fb: FormBuilder, private element: ElementRef, public fblogin: FacebookService) {
    fblogin.init({
      appId: '136134157185050',
      cookie: true,  // enable cookies to allow the server to access 
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.8
    });

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup>this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  loginWithFacebook(): void {
    this.register.googlechecker = false;
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
    this.register.googlechecker = false;
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.register.googlechecker = true;
        this.register.Email = profile.getEmail();
        this.register.FullName = profile.getName();
        this.register.profileUrl = profile.getImageUrl();
        console.log(profile);
        this.register.password = profile.Eea;
        this.register.repassword = profile.Eea;
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
        this.register.googlechecker = false;
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnInit() {
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.services.register(this.register).subscribe(res => {
        if (res.success) {
          console.log(res.msg);
          console.log('Please login now');
          this.router.navigate(['login']);
        } else {
          console.log(res.msg);
        }
      });
    }
  }
}

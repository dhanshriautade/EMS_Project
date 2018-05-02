import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import * as jQuery from 'jquery';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from 'app/theme/validators';
import { NgUploaderOptions } from 'ngx-uploader';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() defaultPicture: string = '';
  @Input() picture: string = '';
  @Input() uploaderOptions: NgUploaderOptions = { url: '' };
  @Input() canDelete: boolean = true;
  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();
  @ViewChild('fileUpload') public _fileUpload: ElementRef;
  public uploadInProgress: boolean;

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  id: string;

  title = "Edit Profile";
  constructor(fb: FormBuilder, private renderer: Renderer) {
    this.id = sessionStorage.getItem('id');
    this.uploaderOptions = { url: environment.profilepic + '/' + this.id };
    console.log(this.uploaderOptions.url);
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(values);
      console.log('success');
    } else {
      console.log(values);
      console.log('error');
    }
  }

  ngOnInit() {
  }

  beforeUpload(uploadingFile): void {
    let files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);
      if (!this._canUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadInProgress = true;
      }
    }
  }

  bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  removePicture(): boolean {
    this.picture = '';
    return false;
  }

  _changePicture(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (<any>event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  _onUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
      console.log(data);
    }
  }

  _onUploadCompleted(data): void {
    this.uploadInProgress = false;
    this.onUploadCompleted.emit(data);
  }

  _canUploadOnServer(): boolean {
    return !!this.uploaderOptions['url'];
  }
}

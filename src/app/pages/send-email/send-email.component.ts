import { Component, OnInit } from '@angular/core';
import { Services } from 'app/service/service.service';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Session } from 'app/service/session.session';
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent  {
  Data={
    to:null,
    Subject:null,
    Text:null}
  // public form: FormGroup;
  // public from: AbstractControl;
  // public to: AbstractControl;
  // public message: AbstractControl;
  // public submitted: boolean = false;

  
  constructor(public session: Session, public router: Router, public service: Services) {
    //this.onSubmit();
   }
   public onSubmit() {
       
  
   // if (this.form.valid) {
      this.service.sendMail(this.Data).subscribe(res => {
        if (res.success) {
          console.log(res);
          this.router.navigate(['pages/send-email']);
        } else {
          console.log(res);
        }
      })
    //}
    }


}


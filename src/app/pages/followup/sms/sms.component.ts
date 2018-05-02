import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Services } from 'app/service/service.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Session } from 'app/service/session.session';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent {
 
  
  constructor(public session: Session, public router: Router, public service: Services) {
    //this.onSubmit();
   }
   public onSubmit() {
       
   
    // if (this.form.valid) {
      
       this.service.testtwilio(this).subscribe(res => {
         if (res.success) {
           console.log(res);
           this.router.navigate(['pages/followup/sms']);
         } else {
           console.log(res);
         }
       })
      
     }
    }

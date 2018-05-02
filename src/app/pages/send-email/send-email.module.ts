import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SendEmailComponent } from 'app/pages/send-email/send-email.component';
import { routing } from 'app/pages/send-email/send-email.routing';
import { NgaModule } from 'app/theme/nga.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        NgaModule
    ],
    declarations: [
        SendEmailComponent
    ]
})
export class SendEmailModule {
}

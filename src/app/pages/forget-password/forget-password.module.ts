import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './forget-password.routing';
import { ForgetPasswordComponent } from 'app/pages/forget-password/forget-password.component';

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        routing
    ],
    declarations: [
        ForgetPasswordComponent
    ]
})
export class ForgetPasswordModule { }

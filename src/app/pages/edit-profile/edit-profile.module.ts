import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from 'app/pages/edit-profile';
import { routing } from 'app/pages/edit-profile/edit-profile.routing';
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
    imports: [
        routing,
        NgaModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgUploaderModule
    ],
    declarations: [
        EditProfileComponent
    ],
    providers: []
})
export class ProfileModule { }

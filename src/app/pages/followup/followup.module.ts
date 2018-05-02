import { NgModule } from '@angular/core';
import { routing } from 'app/pages/followup/followup.routing';
import { FollowupComponent } from 'app/pages/followup/followup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgUploaderModule } from 'ngx-uploader';
import { NgaModule } from 'app/theme/nga.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SearchStudentsComponent } from './search-students/search-students.component';
import {  SmsComponent } from './sms/sms.component';
import { DataTableModule } from "angular2-datatable";

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HotTable, HotTableModule } from 'ng2-handsontable';
import { DataFilterPipe } from './search-students/data-filter.pipe';

@NgModule({
    imports: [
        Ng2SmartTableModule,
        HotTableModule,
        routing,
        NgaModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbDatepickerModule,
        AngularMultiSelectModule,
        NgUploaderModule,
        SlimLoadingBarModule,
        DataTableModule
    ],
    declarations: [
        FollowupComponent,
        DataFilterPipe,  
        SearchStudentsComponent,
        SmsComponent,
    ],
    providers: []
})
export class FollowupModule { }

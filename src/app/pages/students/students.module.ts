import { NgModule } from '@angular/core';
import { routing } from 'app/pages/students/students.routing';
import { StudentsComponent } from 'app/pages/students/students.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { RegistrationComponent } from 'app/pages/students/registration/registration.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgUploaderModule } from 'ngx-uploader';
import { NgaModule } from 'app/theme/nga.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DataTableModule } from "angular2-datatable";

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HotTable, HotTableModule } from 'ng2-handsontable';
import { StudentListComponent } from './student-list/student-list.component';
import { DataFilterPipe } from 'app/pages/students/data-filter.pipe';

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

        StudentsComponent,
        DataFilterPipe, 
        EnquiryComponent,
        RegistrationComponent,
        StudentListComponent
    ],
    providers: []
})
export class StudentsModule { }

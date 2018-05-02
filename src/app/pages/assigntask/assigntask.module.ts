import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';


import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgUploaderModule } from 'ngx-uploader';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DataTableModule } from "angular2-datatable";

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HotTable, HotTableModule } from 'ng2-handsontable';
import { DataFilterPipe } from './data-filter.pipe';
import { assigntask } from './assigntask.component';
import { routing } from './assigntask.route';

@NgModule({
  imports: [
    Ng2SmartTableModule,
        HotTableModule,  
  
        FormsModule,
        NgbDatepickerModule,
        AngularMultiSelectModule,
        NgUploaderModule,
        SlimLoadingBarModule,
        DataTableModule,
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    assigntask,
     DataFilterPipe,
  ]
 
})
export class assigntaskModule { }

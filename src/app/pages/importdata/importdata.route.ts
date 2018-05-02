import { Routes, RouterModule }  from '@angular/router';

import { importdata } from './importdata.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: importdata
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

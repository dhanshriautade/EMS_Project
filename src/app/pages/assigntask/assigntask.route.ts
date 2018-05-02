import { Routes, RouterModule }  from '@angular/router';

import { assigntask } from './assigntask.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: assigntask
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { ForgetPasswordComponent } from 'app/pages/forget-password/forget-password.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
    {
        path: '',
        component: ForgetPasswordComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

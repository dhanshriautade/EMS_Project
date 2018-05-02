import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'forget-password',
    loadChildren: 'app/pages/forget-password/forget-password.module#ForgetPasswordModule'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

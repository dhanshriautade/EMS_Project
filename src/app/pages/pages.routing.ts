import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'importdata', loadChildren: './importdata/importdata.module#importdataModule' },
      { path: 'assigntask', loadChildren: './assigntask/assigntask.module#assigntaskModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'send-email', loadChildren: './send-email/send-email.module#SendEmailModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'availables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'students', loadChildren: './students/students.module#StudentsModule' },
      { path: 'followup', loadChildren: './followup/followup.module#FollowupModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
      { path: "edit-profile", loadChildren: './edit-profile/edit-profile.module#ProfileModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

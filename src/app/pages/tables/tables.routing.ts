import { Routes, RouterModule } from '@angular/router';

import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { DataTables } from './components/dataTables/dataTables.component';
import { HotTablesComponent } from './components/hotTables/hotTables.component';
import { ViewUserComponent } from 'app/pages/tables/components/view-user/view-user.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Tables,
    children: [
      { path: 'basictables', component: BasicTables },
      { path: 'smarttables', component: SmartTables },
      { path: 'employees', component: DataTables },
      { path: 'employee/:id', component: ViewUserComponent },
      { path: 'hottables', component: HotTablesComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

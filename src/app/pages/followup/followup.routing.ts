import { Routes, RouterModule } from '@angular/router';

import { FollowupComponent } from 'app/pages/followup/followup.component';
import { SearchStudentsComponent } from 'app/pages/followup/search-students/search-students.component';
import { SmsComponent } from 'app/pages/followup/sms/sms.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: FollowupComponent,
        children: [
            { path: 'search', component: SearchStudentsComponent },
            { path: 'sms', component: SmsComponent },
        ]
    }
];

export const routing = RouterModule.forChild(routes);

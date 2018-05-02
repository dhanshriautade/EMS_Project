import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from 'app/pages/send-email/send-email.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: SendEmailComponent,
        children: [
        ]
    }
];

export const routing = RouterModule.forChild(routes);

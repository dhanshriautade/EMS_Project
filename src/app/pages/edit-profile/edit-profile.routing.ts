import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from 'app/pages/edit-profile';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: EditProfileComponent
    }
];

export const routing = RouterModule.forChild(routes);

import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from 'app/pages/students/students.component';
import { EnquiryComponent } from 'app/pages/students/enquiry/enquiry.component';
import { RegistrationComponent } from 'app/pages/students/registration/registration.component';
import { StudentListComponent } from 'app/pages/students/student-list/student-list.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: StudentsComponent,
        children: [
            { path: 'enquiry', component: EnquiryComponent },
            { path: 'register', component: RegistrationComponent },
            { path: 'student-list/:title/:id', component: StudentListComponent }
        ]
    }
];

export const routing = RouterModule.forChild(routes);

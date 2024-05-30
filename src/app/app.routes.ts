import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
    {
        path : "",
        component: EmployeeListComponent
    },
    {
        path : "employee-list",
        component: EmployeeListComponent,
    },
    {
        path : "create-employee",
        component: EmployeeFormComponent
    },
    {
        // colon id means something which we want to send with input -->employee/4
        path: "employee/:id",    
        component: EmployeeFormComponent
    }    
];

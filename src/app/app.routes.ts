import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';

export const routes: Routes = [
    {
        path: "",
        component: StudentListComponent
    },
    {
        path: "create-student",
        component: CreateStudentComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

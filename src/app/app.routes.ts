import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { LoginComponent } from './components/login/login.component';
import { FobbidenComponent } from './components/fobbiden/fobbiden.component';
import { AuthGuard } from './auth/auth.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    }, {
        path: "home",
        component: StudentListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "create-student",
        component: CreateStudentComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "access-denied",
        component: FobbidenComponent
    },
    {
        path: "unauthorize",
        component: ErrorPageComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }

];

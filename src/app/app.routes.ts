import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { TestimoniosComponent } from './pages/testimonios/testimonios.component';
import {authGuard} from "./guards/auth.guard";
import {roleGuard} from "./guards/role.guard";
import {ActiveTeachersComponent} from "./pages/active-teachers/active-teachers.component";
import {StudentsComponent} from "./pages/students/students.component";
import {HomeAdminComponent} from "./pages/home-admin/home-admin.component";
import {HomeTeacherComponent} from "./pages/home-teacher/home-teacher.component";
import {HomeStudentComponent} from "./pages/home-student/home-student.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ChatsComponent} from "./pages/chats/chats.component";


export const routes: Routes = [
    {path: "", pathMatch:"full", redirectTo: "home"},
    {path: "home", component: HomeComponent},
    {path: "dashboard", component: DashboardComponent, canActivate: [authGuard], children: [
        {path:"admin", component: HomeAdminComponent},
        {path:"teacher", component: HomeTeacherComponent},
        {path:"student", component: HomeStudentComponent}
      ]
    },
    {path: "sign-in", component: SignInComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "teachers", component: TeachersComponent},
    {path: "chats", component: ChatsComponent},
    {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
    {path: "admin/activate-teachers", component: ActiveTeachersComponent, canActivate: [authGuard]},
    {path: "admin/student-list", component: StudentsComponent, canActivate: [authGuard]},
    {path: 'testimonios', component: TestimoniosComponent },
    {path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
    {path: 'como-funciona', component: ComoFuncionaComponent },
    {path: '**', component: NotFoundComponent }
];

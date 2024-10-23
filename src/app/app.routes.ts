import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestimoniosComponent } from './pages/testimonios/testimonios.component';

export const routes: Routes = [
    {path: "", pathMatch:"full", redirectTo: "home"},
    {path: "home", component: HomeComponent},
    {path: "sign-in", component: SignInComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "teachers", component: TeachersComponent},      
    {path: "profile", component: ProfileComponent},
    {path: 'testimonios', component: TestimoniosComponent },
];

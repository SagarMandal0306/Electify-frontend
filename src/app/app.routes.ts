import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },{
        path:'signup',
        component:SignupComponent
    },{
        path:'',
        component:HomeComponent
    },
    {
        path:'profile',
        component:ProfileComponent
    }
];

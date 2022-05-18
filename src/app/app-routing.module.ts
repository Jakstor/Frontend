import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'logOrReg', component: LoginOrRegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

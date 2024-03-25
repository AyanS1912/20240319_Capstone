import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : '**', component :PageNotFoundComponent},
  {path : 'navbar', component : NavbarComponent},
  {path : 'home', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

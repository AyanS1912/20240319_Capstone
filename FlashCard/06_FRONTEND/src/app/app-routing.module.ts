import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { DeckCardComponent } from './components/deck-card/deck-card.component';

const routes: Routes = [
  {path: 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  // {path : '**', component :PageNotFoundComponent},
  { path : 'nav', component :NavbarComponent},
  { path :'side', component : SidebarComponent},
  { path : 'home', component : HomeComponent},
  { path : 'deck', component : DeckCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HomeComponent } from "./components/home/home.component";
import { DeckCardComponent } from "./components/deck-card/deck-card.component";
import { EditDeckComponent } from "./components/edit-deck/edit-deck.component";
import { EditFlashcardComponent } from "./components/edit-flashcard/edit-flashcard.component";
import { DeckFlashcardsComponent } from "./components/deck-flashcards/deck-flashcards.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "nav", component: NavbarComponent, canActivate: [AuthGuard] },
  { path: "side", component: SidebarComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "deck", component: DeckCardComponent, canActivate: [AuthGuard] },
  {
    path: "edit-deck/:id",
    component: EditDeckComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit-flashcard/:id",
    component: EditFlashcardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "deck-flashcards/:id",
    component: DeckFlashcardsComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

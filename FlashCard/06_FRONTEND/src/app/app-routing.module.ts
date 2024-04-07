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
import { RichtextComponent } from "./components/richtext/richtext.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  // {path : '**', component :PageNotFoundComponent},
  { path: "nav", component: NavbarComponent },
  { path: "side", component: SidebarComponent },
  { path: "home", component: HomeComponent },
  { path: "deck", component: DeckCardComponent },
  { path: "edit-deck/:id", component: EditDeckComponent },
  { path: "edit-flashcard/:id", component: EditFlashcardComponent },
  { path: 'deck-flashcards/:id', component: DeckFlashcardsComponent },
  { path : "rich", component : RichtextComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

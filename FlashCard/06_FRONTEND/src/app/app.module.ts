import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HomeComponent } from "./components/home/home.component";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { DeckCardComponent } from "./components/deck-card/deck-card.component";
import { ViewFlashcardsComponent } from "./components/view-flashcards/view-flashcards.component";
import { ViewDecksComponent } from "./components/view-decks/view-decks.component";
import { CreateFlashcardComponent } from "./components/create-flashcard/create-flashcard.component";
import { CreateDecksComponent } from "./components/create-decks/create-decks.component";
import { MyprofileComponent } from "./components/myprofile/myprofile.component";
import { HttpClientModule } from "@angular/common/http";
import { EditDeckComponent } from "./components/edit-deck/edit-deck.component";
import { EditFlashcardComponent } from "./components/edit-flashcard/edit-flashcard.component";
import { DeckFlashcardsComponent } from "./components/deck-flashcards/deck-flashcards.component";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { FlashcardsComponent } from "./components/flashcards/flashcards.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    CreateFlashcardComponent,
    DeckCardComponent,
    ViewFlashcardsComponent,
    ViewDecksComponent,
    CreateDecksComponent,
    MyprofileComponent,
    EditDeckComponent,
    EditFlashcardComponent,
    DeckFlashcardsComponent,
    ConfirmationDialogComponent,
    FlashcardsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EditorModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
//* Components
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/login/components/register/register.component';
import { SignInComponent } from './views/login/components/sign-in/sign-in.component';
import { CardsComponent } from './views/cards/cards.component';
import { CardListComponent } from './views/cards/components/card-list/card-list.component';
import { CardFormComponent } from './views/cards/components/card-form/card-form.component';
import { MovementComponent } from './views/movements/components/movement/movement.component';
import { MovementsComponent } from './views/movements/components/movements/movements.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    LoginComponent,
    CardListComponent,
    CardFormComponent,
    CardsComponent,
    MovementComponent,
    MovementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

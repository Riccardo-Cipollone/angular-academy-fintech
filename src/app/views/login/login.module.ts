import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent, 
    SignInComponent, 
    RegisterComponent
  ],
  imports: [
    CommonModule, 
    LoginRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class LoginModule { }

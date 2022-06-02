import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
//* Components
import { SharedModule } from './shared/shared.module';
import { TransferComponent } from './views/transfer/transfer.component';
import { ContactsComponent } from './views/transfer/components/contacts/contacts.component';
import { ContactListComponent } from './views/transfer/components/contact-list/contact-list.component';
import { ContactFormComponent } from './views/transfer/components/contact-form/contact-form.component';
import { SearchComponent } from './views/transfer/components/search/search.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { LocationListComponent } from './views/appointments/components/location-list/location-list.component';
import { CreateAppointmentComponent } from './views/appointments/components/create-appointment/create-appointment.component';
import { ConfirmAppointmentComponent } from './views/appointments/components/confirm-appointment/confirm-appointment.component';
import { MapAppointmentComponent } from './views/appointments/components/map-appointment/map-appointment.component';


@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent,
    SearchComponent,
    AppointmentsComponent,
    LocationListComponent,
    CreateAppointmentComponent,
    ConfirmAppointmentComponent,
    MapAppointmentComponent
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

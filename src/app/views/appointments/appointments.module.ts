import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { ConfirmAppointmentComponent } from './components/confirm-appointment/confirm-appointment.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { MapAppointmentComponent } from './components/map-appointment/map-appointment.component';


@NgModule({
  declarations: [
    AppointmentsComponent,
    ConfirmAppointmentComponent,
    CreateAppointmentComponent,
    LocationListComponent,
    MapAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AppointmentsModule { }

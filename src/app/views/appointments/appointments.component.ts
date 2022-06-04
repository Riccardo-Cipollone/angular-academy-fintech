import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { Location } from '../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  locationList: Location[] = [];
  selectedLocation: Location | null = null;

  constructor(private appointmentSrv: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentSrv.getAllLocations().subscribe({
      next: result => this.locationList = result
    })
  }

  selectLocationHandler(location: Location) {
    if (this.selectedLocation === location) {
      this.dispose();
      return;
    }

    this.selectedLocation = location;
    this.drawer.open();
  }

  closeDrawerHandler() {
    this.dispose();
  }

  private dispose() {
    this.selectedLocation = null;
    this.drawer.close();
  }

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { Location } from '../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  locations$ = new BehaviorSubject<Location[]>([]);
  locationId$ = new BehaviorSubject<string>('');
  selectedLocation$ = combineLatest([this.locations$, this.locationId$]).pipe(
    map(([locations, id]) => {
      const selectedLocation = locations.find(location => location._id === id);
      return selectedLocation || null;
    })
  )

  constructor(private appointmentSrv: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentSrv.getAllLocations().subscribe({
      next: result => this.locations$.next(result),
      error: err => console.error(err)
    })
  }

  selectLocationHandler(locationId: string) {
    if (this.locationId$.getValue() === locationId) {
      this.dispose();
      return;
    }

    this.locationId$.next(locationId);
    this.drawer.open();
  }

  closeDrawerHandler() {
    this.dispose();
  }

  private dispose() {
    this.locationId$.next('');
    this.drawer.close();
  }

}
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Location } from '../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent   {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  locations: Location[] = locations_mock;
  selectedLocation: Location | null = null;

  selectLocationHandler(location: Location) {
    console.log("Selected location: ", location);
    this.selectedLocation = location;
    this.drawer.open();
  }

}

const locations_mock: Location[] =[
  {
  "_id": "1",
  "name": "Sede 1",
  "address": "Via dei Tali 1, Roma",
  "coords": [
  41.9027835,
  12.4963655
  ],
  "email": "test1@test1.com",
  "phone": "000 0000000"
  },
  {
  "_id": "2",
  "name": "Sede 2",
  "address": "Via dei Tali 2, Roma",
  "coords": [
  41.9027935,
  12.4163155
  ],
  "email": "test2@test2.com",
  "phone": "111 1111111"
  },
  {
  "_id": "3",
  "name": "Sede 3",
  "address": "Via dei Tali 3, Firenze",
  "coords": [
  43.76956,
  11.255814
  ],
  "email": "test3@test3.com",
  "phone": "222 2222222"
  },
  {
  "_id": "4",
  "name": "Sede 4",
  "address": "Via dei Tali 4, Bassano del Grappa",
  "coords": [
  45.765729,
  11.727275
  ],
  "email": "test4@test4.com",
  "phone": "333 3333333"
  },
  {
  "_id": "5",
  "name": "Sede 5",
  "address": "Via dei Tali 5, Cagliari",
  "coords": [
  39.223841,
  9.121661
  ],
  "email": "test5@test5.com",
  "phone": "444 4444444"
  }
]
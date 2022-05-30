import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {

  @Input() locationList: Location[] = [];
  @Output() selectLocation: EventEmitter<Location> = new EventEmitter<Location>();

}
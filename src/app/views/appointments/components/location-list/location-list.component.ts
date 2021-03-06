import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationListComponent {

  @Input() locations: Location[] | null = [];
  @Output() selectLocation: EventEmitter<string> = new EventEmitter<string>();

}
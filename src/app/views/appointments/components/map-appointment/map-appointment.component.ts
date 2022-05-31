import { AfterViewChecked, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-appointment',
  templateUrl: './map-appointment.component.html',
  styleUrls: ['./map-appointment.component.scss']
})
export class MapAppointmentComponent implements OnChanges, AfterViewChecked {

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  @Input() coords: [number, number] | undefined = undefined;
  map!: L.Map;
  marker!: L.Marker;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coords'] && changes['coords'].firstChange) {
      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      this.map = L.map(this.mapContainer.nativeElement).setView(coords, 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      this.marker = L.marker(coords)
        .addTo(this.map)
        .openPopup();
    }

    if (changes['coords'] && !changes['coords'].firstChange) {
      const coords: L.LatLngExpression = this.coords as L.LatLngExpression;
      this.map.setView(coords);
      this.marker.setLatLng(coords);
    }
  }

  // TODO: Workaround per renderizzare leaflet dentro ngIf
  ngAfterViewChecked(): void {
    this.map.invalidateSize(true);
  }

}

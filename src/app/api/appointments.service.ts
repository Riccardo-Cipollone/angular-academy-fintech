import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayWithSlot, DayWithSlots, Location } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  /**
   * Brief description: service to retrieve a list of all locations.
   * @returns { Location[] } List of locations
   */
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiUrl}/locations`);
  }

  /**
   * - Brief description: service to retrieve a list of avalaible slots for a location.
   * @param locationId The ID of a location
   * @returns {DayWithSlots[]} Avalaible slots for a location
   */
  getLocationSlots(locationId: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(`${environment.apiUrl}/slots/${locationId}`)
  }

  /**
   * Brief description: service to confirm an appointment.
   * @param slot The slot wanted for the appointment
   * @returns { boolean } True if the appointment is booked succesfully, otherwise false
   */
  confirmAppointment(slot: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/schedule`, slot);
  }

}

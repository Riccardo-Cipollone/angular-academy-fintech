import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) { }

  /**
   * Brief description: TODO
   * @param taxes TODO
   * @returns True if operation is succesful, otherwise false
   */
  addTaxes(taxes: any) { // TODO: Tipizzare meglio
    return this.http.post(`${environment.apiUrl}/taxes`, taxes);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  /**
   * Brief description: service to transfer money.
   * @param transferData Data needed for money transfer
   * @returns { boolean } True if the transfer is succesful, otherwise false
   */
  transferMoney(transferData: Transfer): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/transfer`, transferData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Card, CardForm } from '../models/card.model';
import { MovementApiResponse } from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }
  
  /**
   * Brief description: service to return a list of credit cards.
   * @returns { Card[] } List of all cards
   */
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/cards`);
  }

  /**
   * Brief description: service to create a new credit card.
   * @param cardData All the info necessary to create a card.
   * @returns { Card } The created card
   */
  createNewCard(cardData: CardForm): Observable<Card> {
    return this.http.post<Card>(`${environment.apiUrl}/cards`, cardData);
  }

  /**
   * Brief description: service to delete a credit card.
   * @param cardId The ID of the card we want to delete.
   * @returns { boolean } Returns true if the element gets deleted, otherwise false
   */
  deleteCard(cardId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/cards/${cardId}`);
  }

  /**
   * Brief description: service to retrieve all movements linked to a card.
   * @param cardId Id of the card
   * @param limit query param
   * @param offset query param
   * @returns { MovementApiResponse } Object with a list of Movements and the amount
   */
  getCardMovements(cardId: string, limit: number = 5, offset: number = 0): Observable<MovementApiResponse> {
    return this.http.get<MovementApiResponse>(`${environment.apiUrl}/cards/${cardId}/movements?limit=${limit}&offset=${offset}`);
  }

}

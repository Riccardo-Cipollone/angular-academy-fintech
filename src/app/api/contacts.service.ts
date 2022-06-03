import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  /**
   * Brief description: service to retrieve a list of all contacts.
   * @returns { Contact[] } A list of contacts
   */
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contacts`);
  }

  /**
   * Brief description: service to add a new contact.
   * @param newContact Contact to add without ID.
   * @returns { Contact } New added contact
   */
  createNewContact(newContact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(`${environment.apiUrl}/contacts`, newContact);
  }

  /**
   * Brief description: service to edit an existing contact.
   * @param contact New contact fields
   * @returns { Contact } The edited contact
   */
  editContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiUrl}/contacts/${contact._id}`, contact);
  }

  /**
   * Brief description: service to delete an existing contact.
   * @param contactId Id of contact to delete.
   * @returns { boolean } True if delete operation is succesful, otherwise false
   */
  deleteContact(contactId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/contacts/${contactId}`);
  }

}

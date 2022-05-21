import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Pipe({
  name: 'filterContactByText'
})
export class FilterContactByTextPipe implements PipeTransform {

  transform(contacts: Contact[], search: string) {
    // if no text, returns all
    if (search === '') {
      return contacts;
    }
    // return filtered items
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(search.toLowerCase()) || contact.surname.toLowerCase().includes(search.toLowerCase());
    });
  }

}

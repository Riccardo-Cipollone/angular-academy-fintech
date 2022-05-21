import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // TODO: Possibilita' di generalizzare il componente usando un array di elementi generici
  @Input() contacts: Contact[] = [];
  @Output() filteredContacts = new EventEmitter<Contact[]>();

  searchControl: FormControl = new FormControl('');
  subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges.pipe(
      startWith(''), debounceTime(300), distinctUntilChanged()
    ).subscribe(search => {
      // If search is empty, return all elements
      if (search === '') return this.filteredContacts.emit(this.contacts);
      // Return filtered items
      return this.filteredContacts.emit(this.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(search.toLowerCase())
          || contact.surname.toLowerCase().includes(search.toLowerCase());
      }));
    })
  }

  resetField() {
    this.searchControl.patchValue('');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

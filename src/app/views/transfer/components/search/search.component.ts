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
  @Output() searchText = new EventEmitter<string>();

  searchControl: FormControl = new FormControl('');
  subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => {
      // If search is empty, return all elements
      if (search === '') return this.searchText.emit('');
      // Return filtered items
      return this.searchText.emit(search);
    })
  }

  resetField() {
    this.searchControl.patchValue('');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

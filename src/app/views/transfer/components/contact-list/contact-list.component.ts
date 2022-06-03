import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent {

  @Input() contactList: Contact[] = [];
  @Input() searchText: string = "";
  @Output() selectContact = new EventEmitter<string>();
  @Output() editContact = new EventEmitter<string>();
  @Output() deleteContact = new EventEmitter<string>();

}

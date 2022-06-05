import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact, ContactState } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  status$ = new BehaviorSubject<ContactState>({ type: 'list' });
  contacts$ = new BehaviorSubject<Contact[]>([]);
  // selectedContact: Contact | null = null;
  currentSearchText: string = "";

  selectedContact$ = combineLatest([this.status$, this.contacts$]).pipe(
    map(([status, contacts]) => contacts.find(contact => contact._id === status.id) || null )
  )

  constructor(
    private contactSrv: ContactsService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.contactSrv.getAllContacts().subscribe({
      next: contacts => {
        console.table(contacts);
        this.contacts$.next(contacts);
      }
    })
  }

  searchTextHandler(searchText: string) {
    this.currentSearchText = searchText;
  }

  saveHandler(contact: Partial<Contact>): void {
    if (this.status$.getValue().type === 'edit') {
      this.saveContact(contact);
    } else {
      this.addContact(contact);
    }
    this.status$.next({ type: 'list' });
  }

  selectHandler(contactId: string): void {
    const foundContact = this.contacts$.getValue().find(item => item._id === contactId);
    this.dialogRef.close(foundContact);
  }

  editHandler(contactId: string): void {
    this.status$.next({ type: 'edit', id: contactId });
    const index = this.contacts$.getValue().findIndex(item => item._id === contactId);
  }

  deleteHandler(contactId: string): void {
    this.contactSrv.deleteContact(contactId).subscribe({
      next: result => {
        const filteredArray = this.contacts$.getValue().filter(contact => contact._id !== contactId);
        this.contacts$.next(filteredArray);
      }
    })
  }

  private saveContact(contact: Partial<Contact>): void {
    this.contactSrv.editContact(contact).subscribe({
      next: result => {
        this.contacts$.next(this.contacts$.getValue().map(contact => {
          return contact._id === result._id ? result : contact;
        }))
      }
    })
  }

  private addContact(contact: Partial<Contact>): void {
    this.contactSrv.createNewContact(contact).subscribe({
      next: result => {
        this.contacts$.next([...this.contacts$.getValue(), result]);
      }
    })
  }

  newContact(): void {
    this.status$.next({ type: 'new' });
  }

  goBackToList(): void {
    this.status$.next({ type: 'list' });
  }

}
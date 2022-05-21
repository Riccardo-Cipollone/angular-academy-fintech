import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contactStatus: 'list' | 'form' = 'list';
  contactList: Contact[] = [
    { _id: '123', iban: '1111111111111111', name: 'Riccardo', surname: 'Cipollone' },
    { _id: '456', iban: '2222222222222222', name: 'Fabio', surname: 'Di Marco' },
    { _id: '789', iban: '3333333333333333', name: 'Jasmine', surname: 'Cipollone' },
    { _id: '222', iban: '4444444444444444', name: 'Fabio', surname: 'Biondi' },
  ]
  selectedContact: Contact | null = null;
  currentSearchText: string = "";

  constructor(
    public dialogRef: MatDialogRef<ContactsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  searchTextHandler(searchText: string) {
    this.currentSearchText = searchText;
  }

  selectHandler(contactId: string): void {
    const foundContact = this.contactList.find(item => item._id === contactId);
    this.dialogRef.close(foundContact);
  }

  editHandler(contactId: string): void {
    this.contactStatus = 'form';
    const index = this.contactList.findIndex(item => item._id === contactId);
    this.selectedContact = this.contactList[index];
  }

  deleteHandler(contactId: string): void {
    this.contactList = this.contactList.filter(item => item._id !== contactId);
  }

  saveHandler(contact: Contact): void {
    console.log("Contact received: ", contact)
    this.contactStatus = 'list';
    if (this.selectedContact) {
      // ? Modalita' Edit
      this.contactList = this.contactList.map(item => {
        return item._id === contact._id ? contact : item;
      });
      this.selectedContact = null;
    } else {
      // ? Modalita' New
      this.contactList = [...this.contactList, contact]
    }
  }

  newContact(): void {
    this.contactStatus = 'form';
    this.selectedContact = null;
  }

  goBackToList(): void {
    this.contactStatus = 'list';
    this.selectedContact = null;
  }
}
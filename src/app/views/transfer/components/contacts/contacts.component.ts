import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactStatus: 'list' | 'form' = 'list';
  contactList: Contact[] = [];
  selectedContact: Contact | null = null;
  currentSearchText: string = "";

  constructor(
    private contactSrv: ContactsService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.contactSrv.getAllContacts().subscribe({
      next: contacts => {
        console.table(contacts);
        this.contactList = contacts;
      }
    })
  }

  searchTextHandler(searchText: string) {
    this.currentSearchText = searchText;
  }

  saveHandler(contact: Partial<Contact>): void {
    this.contactStatus = 'list';
    if (this.selectedContact) {
      // ? Modalita' Edit
      this.contactSrv.editContact(contact).subscribe({
        next: result => {
          this.contactList = this.contactList.map(item => {
            return item._id === result._id ? result : item;
          })
          this.selectedContact = null;
        }
      })
    } else {
      // ? Modalita' New
      this.contactSrv.createNewContact(contact).subscribe({
        next: result => {
          this.contactList = [...this.contactList, result];
        }
      })
    }
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
    this.contactSrv.deleteContact(contactId).subscribe({
      next: item => {
        this.contactList = this.contactList.filter(item => item._id !== contactId);
      }
    })
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
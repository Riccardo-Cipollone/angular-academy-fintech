import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { Contact } from 'src/app/models/contact.model';
import { ContactsComponent } from './components/contacts/contacts.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  @ViewChild('confirmTransfer', { static: true }) templateRef!: TemplateRef<any>;

  cards: Card[] = [
    {
      "_id": "824c3060-434c-43a4-8ee2-167bd86fd633",
      "number": "0000 0000 0000 0000",
      "ownerId": "et45er5e6fba",
      "owner": "Mario Rossi",
      "type": "visa",
      "amount": 15000
    },
    {
      "_id": "5375c1e2-68af-4315-bb79-e8747890b6f1",
      "number": "1111 1111 1111 1111",
      "ownerId": "et45er5e6fba",
      "owner": "Mario Rossi",
      "type": "mastercard",
      "amount": 500
    },
    {
      "_id": "e84ca48d-1933-4f4c-bf59-8f5eddc60bd7",
      "number": "2222 2222 2222 2222",
      "ownerId": "et45er5e6fba",
      "owner": "Mario Rossi",
      "type": "visa",
      "amount": 250000
    }
  ]
  selectedContact: Contact | null = null;

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  openContactList() {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedContact = result;
      }
    })
  }

  transferMoney(form: NgForm) {
    const dialogRef = this.dialog.open(this.templateRef);

    dialogRef.afterClosed().pipe(filter(res => res)).subscribe({
      next: () => {
        // TODO: Interroghiamo il server
        console.log(form.value);
        this.snackbar.open("Denaro trasferito con successo!", "Chiudi", { duration: 3000, panelClass: 'custom-snackbar' })
      },
      complete: () => { console.log("Completed!")}
    })
  }

}

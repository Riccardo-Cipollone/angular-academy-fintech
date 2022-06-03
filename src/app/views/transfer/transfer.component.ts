import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { TransferService } from 'src/app/api/transfer.service';
import { Card } from 'src/app/models/card.model';
import { Contact } from 'src/app/models/contact.model';
import { Transfer } from 'src/app/models/transfer.model';
import { ContactsComponent } from './components/contacts/contacts.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @ViewChild('confirmTransfer', { static: true }) templateRef!: TemplateRef<any>;

  cards: Card[] = []
  selectedContact: Contact | null = null;

  constructor(
    private cardSrv: CardsService,
    private transferSrv: TransferService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.cardSrv.getAllCards().subscribe({
      next: cards => {
        console.table(cards, ['_id', 'number', 'type']);
        this.cards = cards;
      }
    });
  }

  openContactList() {
    const dialogRef = this.dialog.open(ContactsComponent, { width: '500px' });

    dialogRef.afterClosed().pipe(filter(res => res)).subscribe(result => {
      this.selectedContact = result;
    })
  }

  transferMoney(form: NgForm) {

    const transferObject: Transfer = {...form.value};
    const dialogRef = this.dialog.open(this.templateRef);

    dialogRef.afterClosed().pipe(
      filter(res => res),
      switchMap(res => {
        console.log(res);
        return this.transferSrv.transferMoney(transferObject);
      })
    ).subscribe({
      next: () => {
        this.snackbar.open("Denaro trasferito con successo! 😎", "Chiudi", { duration: 3000, panelClass: 'custom-snackbar' })
      }, 
      error: err => {
        this.snackbar.open("C'è stato un problema con il transferimento 😢", "Chiudi", { duration: 3000, panelClass: 'custom-snackbar' })
      }
    })
  }
  
}

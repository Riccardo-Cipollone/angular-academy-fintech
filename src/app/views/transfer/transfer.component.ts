import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { TransferService } from 'src/app/api/transfer.service';
import { Card } from 'src/app/models/card.model';
import { Contact } from 'src/app/models/contact.model';
import { Transfer } from 'src/app/models/transfer.model';
import { amountValidator } from 'src/app/shared/validators/amount.validator';
import { ibanValidator } from 'src/app/shared/validators/iban.validator';
import { TransferValidator } from 'src/app/shared/validators/transfer.validator';
import { ContactsComponent } from './components/contacts/contacts.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @ViewChild('confirmTransfer', { static: true }) templateRef!: TemplateRef<any>;

  cards: Card[] = [];
  transferForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    iban: [null, [Validators.required, ibanValidator]],
    transferGroup: this.fb.group({
      amount: [null, [Validators.required, amountValidator]],
      cardId: [null, Validators.required],
    }, { asyncValidators: this.transferValidator.validate(), updateOn: 'blur' })
  })

  constructor(
    private cardSrv: CardsService,
    private transferSrv: TransferService,
    private transferValidator: TransferValidator,
    private fb: FormBuilder,
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

    dialogRef.afterClosed().pipe(filter(res => res)).subscribe(selectedContact => {
      this.selectContact(selectedContact)
    })
  }

  transferMoney() {
    const { name, surname, iban, transferGroup } = this.transferForm.value;
    const { amount, cardId } = transferGroup;

    const transferObject: Transfer = {name, surname, iban, amount, cardId };
    const dialogRef = this.dialog.open(this.templateRef);

    dialogRef.afterClosed().pipe(
      filter(res => res),
      switchMap(res => {
        console.log(res);
        return this.transferSrv.transferMoney(transferObject);
      })
    ).subscribe({
      next: () => {
        this.snackbar.open("Denaro trasferito con successo! 😎", "Chiudi", { duration: 3000, panelClass: 'custom-snackbar' });
        this.transferForm.reset();
      }, 
      error: err => {
        this.snackbar.open("C'è stato un problema con il transferimento 😢", "Chiudi", { duration: 3000, panelClass: 'custom-snackbar' })
      }
    })
  }

  private selectContact(contact: Contact) {
    const { name, surname, iban } = contact;
    this.transferForm.patchValue({ name, surname, iban })
  }
  
}

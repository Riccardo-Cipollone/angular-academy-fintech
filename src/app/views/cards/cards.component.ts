import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card, CardForm } from 'src/app/models/card.model';
import { CardFormComponent } from './components/card-form/card-form.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild(CardFormComponent, { static: true }) formComponentRef!: CardFormComponent;

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

  constructor(private snackbarService: MatSnackBar) { }

  addCardHandler(formData: CardForm) {
    this.cards = [
      ...this.cards,
      { _id: 'test', amount: 1000, number: formData.cardNumber, owner: formData.name, ownerId: '12345', type: formData.type }
    ];
    this.dispose();
    this.snackbarService.open("Carta aggiunta con successo!", "Chiudi", {
      duration: 3000,
      panelClass: 'custom-snackbar'
    })
  }

  viewMovementsHandler(cardId: string) {
    // TODO: Sviluppare logica vista movimenti
    console.log("Card ID in entrata: ", cardId);
  }

  removeCardHandler(cardId: string): void {
    this.cards = this.cards.filter(card => card._id !== cardId);
    this.snackbarService.open("Carta rimossa con successo!", "Chiudi", {
      duration: 3000,
      panelClass: 'custom-snackbar'
    })
  }

  cancelHandler() {
    this.dispose();
  }

  private dispose() {
    this.drawer.close();
    this.formComponentRef.cleanup();
  }


}

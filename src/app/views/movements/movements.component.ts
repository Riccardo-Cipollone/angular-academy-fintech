import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Card } from 'src/app/models/card.model';
import { Movement } from 'src/app/models/movement.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {

  cards: Card[] = MOCK_CARDS;
  movements: Movement[] = MOCK_MOVEMENTS;
  selectedCard: Card | undefined = undefined;
  max: number = 5;

  selectCard(event: MatSelectChange) {
    const foundCard = this.cards.find(card => card._id === event.value);
    if (this.selectedCard === foundCard) {
      return;
    }
    this.max = 5;
    this.selectedCard = foundCard;
  }

  loadMoreMovements() {
    if (this.max === 25) return;
    this.max = this.max + 5;
  }
}

const MOCK_CARDS: Card[] = [
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
const MOCK_MOVEMENTS: Movement[] = [
  {
    _id: '1',
    type: 'in',
    amount: 645,
    title: 'YouTube - Pagamento mensile',
    description: 'Questo mese hai accumulato 752.340 views sul tuo canale!',
    timestamp: Date.now(),
  },
  {
    _id: '2',
    type: 'in',
    amount: 1980,
    title: 'Stipendio',
    description: 'La tua busta paga per questo mese.',
    timestamp: Date.now(),
  },
  {
    _id: '3',
    type: 'out',
    amount: 410,
    title: 'Amazon - Pagamento ordine #1234',
    description: 'Descrizione articolo: "Ciabatte comodissime".',
    timestamp: Date.now(),
  },
  {
    _id: '4',
    type: 'in',
    amount: 100,
    title: 'Regalo di compleanno',
    description: 'Tanti auguri da zia Francesca!!',
    timestamp: Date.now(),
  },
  {
    _id: '5',
    type: 'out',
    amount: 500,
    title: 'Pernottamento in Hotel',
    description: 'Hai pernottato 4 giorni all\'Hotel 4 stelle "La Fiorentina", Firenze.',
    timestamp: Date.now(),
  },
  {
    _id: '6',
    type: 'in',
    amount: 150,
    title: 'Regalo di compleanno',
    description: 'Buon compleanno!',
    timestamp: Date.now(),
  },
  {
    _id: '7',
    type: 'out',
    amount: 390,
    title: 'Bolletta mensile - luce e gas',
    description: 'Questo mese hai speso 280€ di gas e 110€ di luce.',
    timestamp: Date.now(),
  },
  {
    _id: '8',
    type: 'in',
    amount: 500,
    title: 'Quattordicesima',
    description: 'Quattordicesima 2021.',
    timestamp: Date.now(),
  },
  {
    _id: '9',
    type: 'out',
    amount: 495,
    title: 'Abbonamento annuale calcio e sport',
    description: 'Essendo nostro cliente da 14 anni, le abbiamo riservato 5€ di sconto.',
    timestamp: Date.now(),
  },
  {
    _id: '10',
    type: 'in',
    amount: 500,
    title: 'Regalo di compleanno',
    description: 'Tanti auguri dal parente sicuramente più simpatico!',
    timestamp: Date.now(),
  },
  {
    _id: '11',
    type: 'out',
    amount: 500,
    title: 'Cena - Villa Crespi, degustazione',
    description: 'La aspettiamo con ansia anche l\'anno prossimo.',
    timestamp: Date.now(),
  }
]
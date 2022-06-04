import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card.model';
import { Movement } from 'src/app/models/movement.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {

  cards: Card[] = [];
  movements: Movement[] = [];
  activeCard: Card | null = null;
  total: number = 0;
  max: number = 5;

  constructor(
    private snackbar: MatSnackBar,
    private cardSrv: CardsService
  ) { }

  ngOnInit(): void {
    this.cardSrv.getAllCards().subscribe({
      next: cards => this.cards = cards
    })
  }

  selectCard(cardId: string): void {
    if (cardId === null) {
      this.dispose();
      return;
    }

    const selectedCard: Card | undefined = this.cards.find(card => card._id === cardId);
    if (selectedCard) this.activeCard = {...selectedCard};
    this.max = 5;

    this.cardSrv.getCardMovements(cardId, this.max).subscribe({
      next: ({ data, total }) => {
        this.movements = data;
        this.total = total;
      }
    })
  }

  loadMoreMovements(): void {
    if (this.max >= this.total) {
      this.snackbar.open("The max has been reached!", "Close", { panelClass: 'custom-snackbar', duration: 3000 });
      return;
    }
    this.max = this.max + 5;

    if (this.activeCard) {
      this.cardSrv.getCardMovements(this.activeCard?._id, this.max).subscribe({
        next: ({ data, total }) => {
          this.movements = data;
          this.total = total;
        }
      })
    }
  }

  private dispose(): void {
    this.activeCard = null;
    this.movements = [];
    this.total = 0;
  }
}
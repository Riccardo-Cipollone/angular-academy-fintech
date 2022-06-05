import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card.model';
import { Movement } from 'src/app/models/movement.model';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {

  cards$ = new BehaviorSubject<Card[]>([]);
  movements$ = new BehaviorSubject<Movement[]>([]);
  selectedCardId$ = new BehaviorSubject<string>('');
  total$ = new BehaviorSubject<number>(0);

  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cardList, cardId]) => {
      const selectedCard: Card | undefined = cardList.find(card => card._id === cardId);
      return selectedCard;
    })
  );

  max: number = 5;

  constructor(
    private snackbar: MatSnackBar,
    private cardSrv: CardsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cardSrv.getAllCards().subscribe({
      next: cards => this.cards$.next(cards),
      error: err => {
        console.error(err);
      }
    })

    this.route.params.subscribe(params => {
      if (params['cardId']) {
        this.selectCard(params['cardId'])
      };
    })
  }

  selectCard(cardId: string): void {
    if (cardId === null) {
      this.dispose();
      return;
    }
    this.selectedCardId$.next(cardId);
    this.max = 5;

    this.cardSrv.getCardMovements(cardId, this.max).subscribe({
      next: ({ data, total }) => {
        this.movements$.next(data);
        this.total$.next(total);
      }
    })
  }

  loadMoreMovements(): void {
    if (this.max >= this.total$.getValue()) {
      this.snackbar.open("The max has been reached!", "Close", { panelClass: 'custom-snackbar', duration: 3000 });
      return;
    }

    this.max = this.max + 5;
    if (this.selectedCardId$.getValue()) {
      this.cardSrv.getCardMovements(this.selectedCardId$.getValue(), this.max).subscribe({
        next: ({ data, total }) => {
          this.movements$.next(data);
          this.total$.next(total);
        }
      })
    }
  }

  private dispose(): void {
    this.selectedCardId$.next('');
    this.movements$.next([]);
    this.total$.next(0);
  }
}
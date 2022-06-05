import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card, CardForm } from 'src/app/models/card.model';
import { CardFormComponent } from './components/card-form/card-form.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild(CardFormComponent, { static: true }) formComponentRef!: CardFormComponent;

  cards$ = new BehaviorSubject<Card[]>([]);

  constructor(
    private snackbarService: MatSnackBar,
    private cardService: CardsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cardService.getAllCards().subscribe(cards => {
      console.table(cards);
      this.cards$.next(cards)
    })
  }

  addCardHandler(formData: CardForm) {
    this.cardService.createNewCard(formData).subscribe({
      next: result => {
        this.cards$.next([...this.cards$.value, result])
        this.dispose();
        this.openSnackbarNotification("Carta aggiunta con successo! 😎");
      },
      error: err => {
        console.error(err);
        this.dispose();
        this.openSnackbarNotification("Errore durante l'inserimento 😢");
      }
    })
  }

  viewMovementsHandler(cardId: string) {
    console.log("Card ID: ", cardId);
    this.router.navigate(['/dashboard/movements/', cardId])
  }

  removeCardHandler(cardId: string): void {
    this.cardService.deleteCard(cardId).subscribe({
      next: (result) => {
        this.cards$.next(this.cards$.value.filter(card => card._id !== cardId))
        this.openSnackbarNotification("Carta rimossa con successo 😎");
      },
      error: err => {
        console.error(err);
        this.openSnackbarNotification("Errore durante la rimozione 😢");
      }
    })
  }

  dispose(): void {
    this.drawer.close();
    this.formComponentRef.cleanup();
  }

  private openSnackbarNotification(text: string) {
    this.snackbarService.open(text, "Chiudi", {
      duration: 3000,
      panelClass: 'custom-snackbar'
    })
  }


}

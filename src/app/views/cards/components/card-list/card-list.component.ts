import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  @Input() cards: Card[] | null = null;
  @Output() removeCard: EventEmitter<string> = new EventEmitter<string>();
  @Output() viewMovements: EventEmitter<string> = new EventEmitter<string>();
  @Output() addCard: EventEmitter<null> = new EventEmitter<null>();


}

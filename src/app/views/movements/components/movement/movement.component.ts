import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent {

  @Input() timestamp!: number;
  @Input() amount!: number;
  @Input() type!: 'in' | 'out';
  @Input() title!: string;
  @Input() description!: string;

}

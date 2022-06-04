import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovementComponent } from './components/movement/movement.component';
import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';

@NgModule({
  declarations: [
    MovementsComponent,
    MovementComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    SharedModule
  ]
})
export class MovementsModule { }

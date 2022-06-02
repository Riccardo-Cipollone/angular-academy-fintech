import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsComponent } from './movements.component';
import { MovementComponent } from './components/movement/movement.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovementsRoutingModule } from './movements-routing.module';



@NgModule({
  declarations: [
    MovementsComponent, 
    MovementComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MovementsModule { }

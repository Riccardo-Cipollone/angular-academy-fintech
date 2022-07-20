import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'cards', loadChildren: () => import('../cards/cards.module').then(m => m.CardsModule) },
      { path: 'movements', loadChildren: () => import('../movements/movements.module').then(m => m.MovementsModule) },
      { path: 'movements/:cardId', loadChildren: () => import('../movements/movements.module').then(m => m.MovementsModule) },
      { path: 'transfers', loadChildren: () => import('../transfer/transfer.module').then(m => m.TransferModule) },
      { path: 'appointments', loadChildren: () => import('../appointments/appointments.module').then(m => m.AppointmentsModule) },
      { path: 'taxes', loadChildren: () => import('../taxes/taxes.module').then(m => m.TaxesModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

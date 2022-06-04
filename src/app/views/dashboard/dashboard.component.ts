import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  menuRoutes: MenuRoute[] = [
    { name: 'Home', icon: 'home', link: '/dashboard/home' },
    { name: 'Carte', icon: 'credit_card', link: '/dashboard/cards' },
    { name: 'Movimenti', icon: 'receipt_long', link: '/dashboard/movements' },
    { name: 'Trasferisci', icon: 'paid', link: '/dashboard/transfers' },
    { name: 'Appuntamenti', icon: 'event', link: '/dashboard/appointments' },
    { name: 'Tasse', icon: 'summarize', link: '/dashboard/taxes' },
  ];
  selectedRoute: MenuRoute | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
}

interface MenuRoute {
  name: string;
  icon: string;
  link: string;
}

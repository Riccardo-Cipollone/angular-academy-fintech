import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  menuRoutes: MenuRoute[] = [
    { name: 'Home', icon: 'home', link: '/dashboard/home' },
    { name: 'Carte', icon: 'credit_card', link: '/dashboard/cards' },
    { name: 'Movimenti', icon: 'receipt_long', link: '/dashboard/movements' },
    { name: 'Trasferisci', icon: 'paid', link: '/dashboard/transfers' },
    { name: 'Appuntamenti', icon: 'event', link: '/dashboard/appointments' },
    { name: 'Tasse', icon: 'summarize', link: '/dashboard/home' },
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


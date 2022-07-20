import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { UserStore } from '../core/stores/user.store';
import { User } from '../models/user.model';

export interface ICredentials {
  email: string;
  password: string;
  name: string;
  surname: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore
  ) {
    /**
     * Initial request for a CSRF Token. Mandatory!!
     * Evita attacchi CSRF
     */
    this.http.get<void>(`${env.apiUrl}/csrf-token`).subscribe();
  }

  /**
   * Brief Description
   * @param credentials 
   * @returns { boolean } True or False.
   */
  register(credentials: { email: string, password: string, name: string, surname: string }): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/register`, credentials);
  }

  /**
   * Logs the user in, with email and password.
   * Session is maintained with a cookie.
   * It also gets the user info and populates the state.
   */
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${env.apiUrl}/login`, { email, password }).pipe(
      switchMap(() => this.fetchUser()),
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Clears the session, clears the store and navigates to login.
   */
  logout(): void {
    this.http.get<any>(`${env.apiUrl}/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    });
  }

  /**
   * Gets the User's info from server and populates the state.
   * This is _the_ way to check if the user is still logged in.
   */
  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`${env.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
      })
    );
  }
}

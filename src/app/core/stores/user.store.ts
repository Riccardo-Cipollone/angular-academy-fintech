import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';

/**
 * User Store servira' a delineare il profilo dell'utente,
 * e controllare se siamo loggati o no
 */
@Injectable({
    providedIn: 'root'
})
export class UserStore {

    /**
     * ? Rendo private BehaviourSubject, sara' possibile modificarlo solo attraverso i metodi pubblici setUser e removeUser
     * ? Observable public, poiche' non ha il metodo next e non possiamo modificarlo. Serve solo per accedere ai dati dell'utente.
     */
    private _user$ = new BehaviorSubject<User | null>(null);
    user$ = this._user$.asObservable();

    setUser(user: User): void {
        this._user$.next(user);
    }

    removeUser(): void {
        this._user$.next(null);
    }

}

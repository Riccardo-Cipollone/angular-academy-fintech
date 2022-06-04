import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { CardsService } from "src/app/api/cards.service";

@Directive({
    selector: '[transferValidator]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: TransferValidatorDirective,
            multi: true
        }
    ]
})
export class TransferValidatorDirective implements AsyncValidator {
    constructor(private transferValidator: TransferValidator) { }

    validate(control: AbstractControl) {
        return this.transferValidator.validate()(control);
    }
}

@Injectable({
    providedIn: 'root'
})
export class TransferValidator {

    constructor(private cardService: CardsService) { }

    validate(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const amount: number = control.get('amount')?.value;
            const selectedCardId: string = control.get('cardId')?.value;
            
            return this.cardService.getAllCards().pipe(
                map(cards => {
                    const selectedCard = cards.find(card => card._id === selectedCardId);
                    if (selectedCard) {
                        const cardBalance = selectedCard?.amount - amount;
                        return cardBalance > 0 ? null : { negativeBalance: cardBalance }
                    }
                    // ? Shouldn't be possible to return this error.
                    return { noCard: true };
                })
            )
        }
    }
    
}
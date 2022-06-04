import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";

const IBAN_REGEX = new RegExp(/^IT[ ]?\d{2}[ ]?[A-Z][ ]?\d{5}[ ]?\d{5}[ ]?[0-9A-Z]{12}$/igm);

export function ibanValidator(control: AbstractControl): ValidationErrors | null {
    const formIbanValue: string = control.value
    if (formIbanValue) {
        return formIbanValue.match(IBAN_REGEX) ? null : { invalidIban : true };
    }
    return null;
}

@Directive({
    selector: '[ibanValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: IbanValidatorDirective,
        multi: true
    }]
})
export class IbanValidatorDirective implements Validators {
    
    validate(control: AbstractControl): ValidationErrors | null {
        return ibanValidator(control);
    }

}
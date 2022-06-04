import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";

const CODICE_FISCALE_REGEX: RegExp = new RegExp(/^(([a-z]|[A-Z]){6})(\d{2})([a-z]|[A-Z])(\d{2})([a-z]|[A-Z])(\d{3})([a-z]|[A-Z])$/g);

export function validateCodiceFiscale(control: AbstractControl): ValidationErrors | null {
    const codiceFiscale: string = control.value;
    if (codiceFiscale) {
        return codiceFiscale.match(CODICE_FISCALE_REGEX) ? null : { invalidCode: true }
    }
    return null;
}

@Directive({
    selector: '[codFiscaleValidator]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: CodiceFiscaleValidatorDirective,
      multi: true
    }]
  })
export class CodiceFiscaleValidatorDirective implements Validators {

    validate(control: AbstractControl): ValidationErrors | null { return validateCodiceFiscale(control) }

}
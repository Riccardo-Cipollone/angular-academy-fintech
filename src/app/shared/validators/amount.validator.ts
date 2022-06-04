import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

export function amountValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
        return isNaN(control.value) ? { invalidAmount: true } : null
    }
    return null;
}

@Directive({
    selector: '[amountValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: AmountValidatorDirective,
        multi: true
    }]
})
export class AmountValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null { return amountValidator(control) }

} 
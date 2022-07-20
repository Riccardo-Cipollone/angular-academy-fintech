import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function equalFieldsValidator(fieldOne: string, fieldTwo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valueOne: string = control.get(fieldOne)?.value;
        const valueTwo: string = control.get(fieldTwo)?.value;
        return valueOne === valueTwo ? null : { notMatching: true };
    }
}

@Directive({
    selector: '[equalFields]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EqualFieldsValidator,
        multi: true
    }]
})
export class EqualFieldsValidator implements Validators {

    @Input() equalFields: [string, string] = ['',''];
    
    validate(): ValidationErrors | null {
        return equalFieldsValidator(this.equalFields[0], this.equalFields[1]);
    }

}
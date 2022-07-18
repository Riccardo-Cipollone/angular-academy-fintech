import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

export function inpsValidator(control: AbstractControl): ValidationErrors | null {
  const da = control.get('da')?.value;
  const a = control.get('a')?.value;

  return (new Date(da).getTime() < new Date(a).getTime()) ? null : {
    inps: 'La data di inizio deve essere precedente alla data di fine'
  }
}

@Directive({
  selector: '[inpsValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IpnsValidatorDirective,
    multi: true
  }]
})
export class IpnsValidatorDirective implements Validators {

  validate(control: AbstractControl): ValidationErrors | null {
    return inpsValidator(control);
  }

}

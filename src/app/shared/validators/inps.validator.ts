import { AbstractControl, ValidationErrors } from '@angular/forms';

export function InpsValidator(control: AbstractControl): ValidationErrors | null {
  const da = control.get('da')?.value;
  const a = control.get('a')?.value;

  return (new Date(da).getTime() < new Date(a).getTime()) ? null : {
    inps: 'La data di inizio deve essere precedente alla data di fine'
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbanValidatorDirective } from './iban.validator';
import { EqualFieldsValidator } from './equal-fields.validator';
import { AmountValidatorDirective } from './amount.validator';

const validators = [IbanValidatorDirective, EqualFieldsValidator, AmountValidatorDirective];

@NgModule({
  declarations: [
    ...validators
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...validators
  ]
})
export class ValidatorsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbanValidatorDirective } from './iban.validator';
import { EqualFieldsValidator } from './equal-fields.validator';

const validators = [IbanValidatorDirective, EqualFieldsValidator];

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

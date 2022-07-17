import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmountValidatorDirective } from './amount.validator';
import { CodiceFiscaleValidatorDirective } from './codice-fiscale.validator';
import { EqualFieldsValidator } from './equal-fields.validator';
import { IbanValidatorDirective } from './iban.validator';
import { TransferValidatorDirective } from './transfer.validator';

const validators = [
  IbanValidatorDirective,
  EqualFieldsValidator,
  AmountValidatorDirective,
  CodiceFiscaleValidatorDirective,
  TransferValidatorDirective,
];

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

import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { CardForm } from 'src/app/models/card.model';

export const requiredLengthValidator = (requiredNumber: number) => {
  return (formControl: AbstractControl): ValidationErrors | null => {

    if (formControl.value?.toString().length === requiredNumber) {
      return null;
    } else {
      return {
        requiredLength: {
          length: requiredNumber
        }
      }
    }
  }
};

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent {

  @Output() addCard: EventEmitter<CardForm> = new EventEmitter<CardForm>()
  @Output() cancel: EventEmitter<null> = new EventEmitter<null>()
  
  cardTypes: string[] = ['visa', 'mastercard'];

  cardForm = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    number: ['', [Validators.required, requiredLengthValidator(16)]],
    csc: ['', [Validators.required, requiredLengthValidator(3)]],
  })

  constructor(private fb: FormBuilder) { }

  cleanup() {
    this.cardForm.reset();
  }

}

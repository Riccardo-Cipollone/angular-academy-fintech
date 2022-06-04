import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { checkEqualFields } from 'src/app/shared/validators/equal-fields.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isPasswordHidden: boolean = true;
  isRepeatPasswordHidden: boolean = true;

  registerForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  }, {
    validators: checkEqualFields('password', 'repeatPassword')
  })

  constructor(private fb: FormBuilder) { }

  register(): void {
    console.log(this.registerForm.value)
  }

  toggleVisibility(passwordType: string, event: Event): void {
    event.stopPropagation();
    if (passwordType === 'password')
      this.isPasswordHidden = !this.isPasswordHidden;
    else
      this.isRepeatPasswordHidden = !this.isRepeatPasswordHidden;
  }

  checkIfDirty(): boolean {
    return this.registerForm.controls['password'].dirty && this.registerForm.controls['repeatPassword'].dirty;
  }

}

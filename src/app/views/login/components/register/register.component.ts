import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { equalFieldsValidator } from 'src/app/shared/validators/equal-fields.validator';

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
    validators: equalFieldsValidator('password', 'repeatPassword')
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    console.log("Register form value: ", this.registerForm.value);
    const { repeatPassword, ...form } = this.registerForm.value;
    if (!this.registerForm.valid) return;

    this.authService.register(form).subscribe(() => {
      this.router.navigateByUrl('/login/signin');
    })
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

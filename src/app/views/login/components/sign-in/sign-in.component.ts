import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isHidden: boolean = true;
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigateByUrl('/dashboard')
    }
  }

  toggleVisibility(event: Event) {
    event.stopPropagation();
    this.isHidden = !this.isHidden;
  }

}

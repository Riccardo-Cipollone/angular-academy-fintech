import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

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
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  login() {
    const credentials = this.loginForm.value;
    console.log("Credentials: ", credentials);
    this.authService.login(credentials.email, credentials.password).subscribe(success => {
      if (success) {
        this.router.navigateByUrl('');
        // this.router.navigateByUrl('/dashboard');
      } else {
        this.snackBar.open('Credenziali non corrette!');
      }
    })
  }

  toggleVisibility(event: Event) {
    event.stopPropagation();
    this.isHidden = !this.isHidden;
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isHidden: boolean = true;

  constructor(private router: Router) {}

  login(formData: { email: string, password: string }) {
    if (formData.email !== "" && formData.password !== "") {
      console.log("Login form data: ", formData);
      this.router.navigateByUrl('/dashboard')
    }
  }

  toggleVisibility(event: Event) {
    event.stopPropagation();
    this.isHidden = !this.isHidden;
  }

}

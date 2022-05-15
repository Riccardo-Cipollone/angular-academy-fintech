import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isHidden: boolean = true;

  login(formData: { email: string, password: string }) {
    if (formData.email !== "" && formData.password !== "") {
      console.log("Login form data: ", formData);
    }
  }

  toggleVisibility(event: Event) {
    event.stopPropagation();
    this.isHidden = !this.isHidden;
  }

}
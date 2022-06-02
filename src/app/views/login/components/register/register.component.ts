import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isPasswordHidden: boolean = true;
  isRepeatPasswordHidden: boolean = true;

  // TODO: Creare validatore custom per controllare se il valore delle password sono uguali
  register(form: NgForm) {
    const { password, repeatPassword } = form.value;

    if (form.valid && password === repeatPassword ) {
      console.log("Register form data: ", form.value);
    }
  }

  toggleVisibility(passwordType: string, event: Event) {
    event.stopPropagation();
    if (passwordType === 'password')
      this.isPasswordHidden = !this.isPasswordHidden;
    else
      this.isRepeatPasswordHidden = !this.isRepeatPasswordHidden;
  }


}

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  activeForm: 'login' | 'register' = 'login';

  selectForm(): void {
    if (this.activeForm === 'login')
      this.activeForm = 'register';
    else
      this.activeForm = 'login';
  }

}

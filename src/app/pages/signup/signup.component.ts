import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public auth : AuthService) { }

  onSubmit(email: string, password: string) {
    window.alert("email");
    this.auth.createUserWithPassword(email, password);
  }

}

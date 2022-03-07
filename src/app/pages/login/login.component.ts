import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService, private router : Router) { }

  onSubmit(email: string, password: string){
    this.authService.loginUserWithPassword(email, password);
    this.router.navigate([""]);
  }
}

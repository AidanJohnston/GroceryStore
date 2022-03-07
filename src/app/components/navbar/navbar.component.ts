import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth : AuthService) { }

  isAuthenticated() {
    return this.auth.isUserLoggedIn;
  }

  onLogoutClick(){
    this.auth.logoutUser();
  }
}

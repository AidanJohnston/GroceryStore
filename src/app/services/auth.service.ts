import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userState : any;

  constructor(
    public firebaseAuth : AngularFireAuth,
    public router : Router) {
      this.firebaseAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
        } else {
          localStorage.setItem('user', JSON.stringify(null));
        }
      }) 
    }

  createUserWithPassword(email: string, password: string) { 
    this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.sendVerificationEmail();
      })
      .catch(err => {
        console.warn(err.message);
      });
  }

  sendVerificationEmail() {
    if(this.isUserLoggedIn && !this.isUserEmailVerified) {
      this.firebaseAuth.currentUser
        .then(user => {
          user?.sendEmailVerification();
          this.router.navigate(['verify-email']);
      })
    }
  }

  loginUserWithPassword(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() =>{
        return;
      })
      .catch(err => {
        console.warn(err.message);
        return;
      });
  }

  logoutUser(){
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  get isUserLoggedIn() : boolean {
    return JSON.parse(localStorage.getItem('user') ?? "null") != null;
  }

  get isUserEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? "null");

    if(user != null)
      return user.emailVerified;
    else
      return false;
  }
}

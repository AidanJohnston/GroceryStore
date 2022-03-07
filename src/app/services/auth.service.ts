import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState: any;

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
    return this.firebaseAuth.currentUser
      .then(user => {
        if(user === null){
          this.router.navigate(['']);
        }
        else{
          user.sendEmailVerification()
        }
      })
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  loginUserWithPassword(email: string, password: string){
    this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res =>{
        this.router.navigate(['']);
      })
      .catch(err => {
        console.warn(err.message);
      });
  }

  logoutUser(){
    this.firebaseAuth.signOut();
  }

  get isUserLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user !== '{}');
  }

  get isUserEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (user.emailVerified);
  }
}

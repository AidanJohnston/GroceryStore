import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userState : any;
  private success : boolean = false;

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

  async createUserWithPassword(email: string, password: string) : Promise<boolean>{ 

    var success = false;

    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.sendVerificationEmail()
        success = true;
      })
      .catch(err => {
        success = false;
      });

      return success;
  }

  sendVerificationEmail() {
    if(!this.isUserEmailVerified) {
      this.firebaseAuth.currentUser
        .then(user => {
          user?.sendEmailVerification();
      })
    }
  }

  async loginUserWithPassword(email: string, password: string) : Promise<boolean> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() =>{
        this.success = true;
      })
      .catch(err => {
        this.success = false;
      });
      return this.success;
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

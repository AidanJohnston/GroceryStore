import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userState : any;
  private success : boolean = false;

  constructor(
    public firebaseAuth : AngularFireAuth,
    public afs : AngularFirestore,
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

  async createUserWithPassword(email: string, password: string, user : User) : Promise<boolean>{ 

    var success = false;

    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        if(res.user != null){
          this.updateUserData(res.user.uid, user)
          this.sendVerificationEmail()
          success = true;
        }
        else{
          success = false;
        }
        
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

  private async updateUserData(uid : string, user : User) : Promise<Boolean> {

    const data = {
      address: user.address,
      city: user.city,
      email: user.email,
      fName: user.fName,
      lName: user.lName,
      postalCode: user.postalCode,
      province: user.province
    }
    
    
    await this.afs.collection("users").doc(uid).set(data, {merge: true})
      .then(() => {
        return true;
      }).catch(() => {
        return false;
      })

    return false;
  }
}

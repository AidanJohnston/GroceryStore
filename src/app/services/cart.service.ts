import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private afs : AngularFirestore,
    private authService : AuthService) { }


  async addTransaction(transaction: Transaction) : Promise<boolean> {

    var user = this.authService.getUser();

    return this.afs.collection('users').doc(user.uid).collection('transactions').add(transaction).then(res => {
        if(res)
          return true;
        else
          return false;
      }).catch(err => {
        return false;
      });
  }
}

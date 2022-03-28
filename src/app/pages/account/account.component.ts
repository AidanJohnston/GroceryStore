import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction } from 'src/app/models/transaction.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private afs : AngularFirestore,
    private angularFireAuth : AngularFireAuth) { }

  hide: boolean = true;
  isError: boolean = false;

  transaction!: Transaction[];

  ngOnInit(): void {
    this.getTransactions().then(res => {
      this.transaction = res;
    });

    console.log(this.transaction);
  }

  infoSubmit(form: any){

  }

  accountSubmit(form: any){

  }

  async getTransactions() : Promise<Transaction[]> {

    let documents : Transaction[] = [];

    var user = await this.angularFireAuth.currentUser;
    if(user){
      var userRef = this.afs.collection('users').doc(user.uid);
      var transactions = await userRef.collection('transactions').ref.get();
      transactions.forEach(doc => {
        documents.push(doc.data() as Transaction);
      });
    }
    return documents;
  }
}

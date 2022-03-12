import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private afs : AngularFirestore,
    private router : Router,
    private route : ActivatedRoute) { }

    title : string = "";

  ngOnInit(): void {

    if(this.route.snapshot.url[0] == null){
      this.router.navigate(['404']);
    }

    this.title = this.route.snapshot.url[0].path;

    //doc : AngularFirestoreCollection =  this.afs.collection('items', ref => ref.where('name', '==', this.route.snapshot.url[0].path));

  }

}

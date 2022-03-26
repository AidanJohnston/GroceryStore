import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private afs : AngularFirestore,
    private router : Router,
    private route : ActivatedRoute,
    private itemService : ItemsService) { }

    name : string = "";
    discription : string = "";
    photo_ref : string = "";
    price : number = 0;

  ngOnInit(): void {

    /*
    if(this.route.snapshot.url[0] == null){
      this.router.navigate(['404']);
    }*/

    this.itemService.getItem(this.route.snapshot.queryParamMap.get('id') || '').then(item => {
      if(item != null) {
        this.name = item.name;
        this.discription = item.discription;
        this.photo_ref = item.photo_ref;
        this.price = item.price;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  constructor(
    private cartService : CartService,
    private itemService : ItemsService,
    private route : ActivatedRoute) { }

  quantity: number = 0;
  item : Item = {} as Item;

  ngOnInit(): void {

    this.itemService.getItem(this.route.snapshot.queryParamMap.get('id') || '').then(item => {
      if(item != null) {
        this.item = item;
       }
    });
  }

  increaseCart(): void {
    this.quantity++;
    this.cartService.addToCart(this.item);
  }

  decreaseCart(): void {
    if(this.quantity > 0) {
      this.quantity--;
      this.cartService.removeFromCart(this.item);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { AuthService } from 'src/app/services/auth.service';
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
    private route : ActivatedRoute,
    private authService : AuthService,
    private router : Router) { }

  quantity: number = 0;
  item : Item = {} as Item;

  ngOnInit(): void {

    this.itemService.getItem(this.route.snapshot.url[0].toString()).then(item => {
      if(item != null) {
        this.item = item;
       }
    });

    this.quantity = this.cartService.getItemQuantity(this.item);
  }

  increaseCart(): void {

    if(this.authService.isUserLoggedIn) {
      this.quantity++;
      this.cartService.increaseCart(this.item);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  decreaseCart(): void {

    if(this.authService.isUserLoggedIn) {
      if(this.quantity > 0) {
        this.quantity--;
        this.cartService.removeFromCart(this.item);
      }
    }
    else{
      this.router.navigate(['/login']);
    }
  }

}

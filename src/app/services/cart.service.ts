import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartItem } from 'src/app/models/cartItem.model';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = new Cart();
  
  addToCart(item: Item):void{
    let cartItem = this.cart.items.find(value => value.item.id === item.id);
    if(cartItem){
      this.changeQuantity(item.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(item));
  }

  removeFromCart(itemID : string): void{
    this.cart.items = 
    this.cart.items.filter(value => value.item.id != itemID);
  }

  changeQuantity(itemID: string, quantity:number){
    let cartItem = this.cart.items.find(value => value.item.id === itemID);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart():Cart{
    return this.cart;
  }
}

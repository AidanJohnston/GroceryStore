import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { Item } from 'src/app/models/item.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:CartItem[] = [];

    get totalPrice(): number{
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        });

        return totalPrice;
    }
  
  addToCart(item: Item):void{
    let cartItem = this.items.find(value => value.item.id === item.id);
    if(cartItem){
      this.changeQuantity(item.id, cartItem.quantity + 1);
      return;
    }
    this.items.push(new CartItem(item));
  }

  removeFromCart(item : Item): void{
    let cartItem = this.items.find(value => value.item.id === item.id);
    if(!cartItem) return;
    if(cartItem.quantity > 1){
      cartItem.quantity--;
    } else {
      this.items.splice(this.items.indexOf(cartItem), 1);
    }
  }

  changeQuantity(itemID: string, quantity:number){
    let cartItem = this.items.find(value => value.item.id === itemID);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCartItems():CartItem[]{
    return this.items;
  }
}

import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
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

  removeFromCart(itemID : string): void{
    // TODO
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

import { Item  } from "./item.model";

export class CartItem{
    constructor(item : Item){
      this.item = item;  
    }
    item:Item;
    quantity:number = 1;

    get price():number{
        return this.item.price * this.quantity;
    }
}
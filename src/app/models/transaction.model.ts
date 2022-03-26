import { Item } from "./item.model";
import { Address } from "./user.model";

export interface Transaction {
    address : Address,
    time : number,
    total: number,
    items: Item[]
}

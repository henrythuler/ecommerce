import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(product: CartItem){

    let alreadyInCart: boolean = false;
    let existingInCart: CartItem | undefined = undefined;

    if(this.cartItems.length > 0){
      existingInCart = this.cartItems.find(p => p.id === product.id)
      alreadyInCart = (existingInCart != undefined)
    }

    if(alreadyInCart) existingInCart!.quantity++;
    else this.cartItems.push(product)
    
    this.computeCartTotals();

  }

  computeCartTotals(){

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let p of this.cartItems){

      totalPriceValue += p.unitPrice * p.quantity
      totalQuantityValue += p.quantity

    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue)

  }

}

import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartProducts: CartItem[] = []
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private service: CartService){}

  ngOnInit(){
    this.showCart();
  }

  showCart(){
    this.cartProducts = this.service.cartItems;
    this.service.totalPrice.subscribe(data => {this.totalPrice = data})
    this.service.totalQuantity.subscribe(data => this.totalQuantity = data)
    this.service.computeCartTotals();
  }
  
}

import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private service: CartService){}

  ngOnInit(){
    this.updateCartStatus();
  }
  
  updateCartStatus(){
    this.service.totalPrice.subscribe(data => this.totalPrice = data)
    this.service.totalQuantity.subscribe(data => this.totalQuantity = data)
  }

}

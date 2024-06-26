import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/Product';
import { CartItem } from '../../common/CartItem';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product: Product | undefined;
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(() => this.getProduct())
  }

  getProduct(){
    const productId = +this.route.snapshot.paramMap.get("id")!;
    this.productService.getProduct(productId).subscribe(data => this.product = data)
  }

  addToCart(){
    this.cartService.addToCart(new CartItem(this.product!))
  }

}

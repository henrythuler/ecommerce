import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product: Product | undefined;
  constructor(private service: ProductService, private route: ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(() => this.getProduct())
  }

  getProduct(){

    const productId = +this.route.snapshot.paramMap.get("id")!;
    this.service.getProduct(productId).subscribe(data => this.product = data)

  }

}

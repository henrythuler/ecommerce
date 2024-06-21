import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  products: Product[] = [];

  constructor(private service: ProductService){}

  ngOnInit(): void{
    this.service.getProducts().subscribe((data) => this.products = data);
  }

}

import { Component } from '@angular/core';
import { ProductCategory } from '../../common/ProductCategory';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  categories: ProductCategory[] = [];

  constructor(private service: ProductService){}

  ngOnInit(){
    this.service.getProductCategories().subscribe((data) => {this.categories = data})
  }

}

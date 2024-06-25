import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  isSearch: boolean = false;

  constructor(private service: ProductService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    })
  }

  listProducts() {

    this.isSearch = this.route.snapshot.paramMap.has("keyword");

    if(this.isSearch && this.route.snapshot.paramMap.get("keyword") != ""){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }

  }

  handleSearchProducts(){
    const keyword: string = this.route.snapshot.paramMap.get("keyword")!;
    this.service.getProductsByName(keyword).subscribe(data => this.products = data)
  }

  handleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    const hasCategoryName: boolean = this.route.snapshot.paramMap.has("name");

    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    }else{
      this.currentCategoryId = 1
    }

    if(hasCategoryName){
      this.currentCategoryName = this.route.snapshot.paramMap.get("name")!;
    }else{
      this.currentCategoryName = "Books";
    }

    this.service.getProducts(this.currentCategoryId).subscribe((data) => this.products = data);

  }

}

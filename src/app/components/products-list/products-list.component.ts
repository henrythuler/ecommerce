import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/Product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/CartItem';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  products: Product[] = [];

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";

  //1 because ngb component is 1 based
  currentPage: number = 1;
  currentPageSize: number = 5;
  currentTotalElements: number = 0;
  
  isSearch: boolean = false;
  previousKeyword: string = "";

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.listProducts()
    })
  }

  listProducts() {

    this.isSearch = this.route.snapshot.paramMap.has("keyword");
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(this.isSearch && this.route.snapshot.paramMap.get("keyword") != ""){
      this.handleSearchProducts();
    }else if(hasCategoryId){
      const categoryId: number = +this.route.snapshot.paramMap.get("id")!;
      this.currentCategoryId = categoryId
      this.handleProductsByCategory(this.currentCategoryId);
    }else{
      this.handleListAllProducts();
    }

  }

  handleSearchProducts(){
    const keyword: string = this.route.snapshot.paramMap.get("keyword")!;

    if(keyword != this.previousKeyword) this.currentPage = 1;

    this.previousKeyword = keyword;

    this.currentCategoryName = "Results for \"" + keyword + "\""
    this.productService.getProductsByName(keyword, this.currentPage - 1, this.currentPageSize).subscribe(this.processResult())
  }

  handleProductsByCategory(categoryId: number){
    if(this.previousCategoryId != this.currentCategoryId){
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    this.currentCategoryName = this.route.snapshot.paramMap.get("name")!;

    //-1 because on Spring the pagination is 0 based
    this.productService.getProductsByCategory(categoryId, this.currentPage - 1, this.currentPageSize).subscribe(this.processResult());
  }

  handleListAllProducts(){
    this.currentCategoryName = "All Products";
    this.productService.getAllProducts(this.currentPage - 1, this.currentPageSize).subscribe(this.processResult());
  }

  updatePageSize(pageSize: number){
    this.currentPageSize = pageSize;
    this.currentPage = 1;
    this.listProducts();
  }

  addToCart(product: Product){
    
    this.cartService.addToCart(new CartItem(product));

  }

  private processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.currentPage = data.page.number + 1;
      this.currentPageSize = data.page.size;
      this.currentTotalElements = data.page.totalElements;
    }
  }
}

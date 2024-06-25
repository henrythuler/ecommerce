import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/Product';
import { ProductCategory } from '../common/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products'
  private categoryUrl = 'http://localhost:8080/product-category'

  constructor(private httpClient: HttpClient) {}

  getProducts(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`

    //Unwrapping products array from _embedded
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetCategoryResponse>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

}

//The returned API Response Models
interface GetResponse {
  _embedded: {
    products: Product[]
  }
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
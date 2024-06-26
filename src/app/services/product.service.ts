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

  getAllProducts(page: number, pageSize: number): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}?page=${page}&size=${pageSize}`

    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getProductsByCategory(categoryId: number, page: number, pageSize: number): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`

    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getProductsByName(keyword: string, page: number, pageSize: number): Observable<GetResponse>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?keyword=${keyword}&page=${page}&size=${pageSize}`
    return this.httpClient.get<GetResponse>(searchUrl);
  }

  getProduct(id: number): Observable<Product>{
    const productUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(productUrl);
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
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products'

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    //Unwrapping products array from _embedded
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    )
  }

}

//The returned API Response Model
interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  type: string;
  sku: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface ProductsResponse {
  code: number;
  description: string;
  data: {
    type: string;
    products: Product[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${environment.apiUrl}products`);
  }
}

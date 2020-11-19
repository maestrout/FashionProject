import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private uriseg = 'http://localhost:5000/api/product';

  constructor(private httpClient: HttpClient) { }

  getAllProductDetails():Observable<Product[]>{
    const URI = this.uriseg;
    return this.httpClient.get<Product[]>(URI);
  }

  getProductById(prodId): Observable<Product> {
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.get<Product>(URI);
  }

  addProduct(prodRef): Observable<any> {
    const URI = this.uriseg;
    return this.httpClient.post<any>(URI, prodRef);   
  }  

  updateProduct(prodRef): Observable<Product>{
    const URI = this.uriseg + "/" + prodRef._id;
    return this.httpClient.put<Product>(URI, prodRef);
  }

  deleteProductById(prodId): Observable<Product>{
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.delete<Product>(URI);
  }
}
 
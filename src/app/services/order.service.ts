import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private uriseg = 'http://localhost:5000/api/order';

  constructor(private httpClient: HttpClient) { }

  getAllOrderDetails():Observable<Order[]>{
    const URI = this.uriseg;
    return this.httpClient.get<Order[]>(URI);
  }

  getOrderById(prodId): Observable<Order> {
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.get<Order>(URI);
  }

  addOrder(prodRef): Observable<any> {
    const URI = this.uriseg;
    return this.httpClient.post<any>(URI, prodRef);   
  }  

  updateOrder(prodRef): Observable<Order>{
    const URI = this.uriseg + "/" + prodRef._id;
    return this.httpClient.put<Order>(URI, prodRef);
  }

  deleteOrderById(prodId): Observable<Order>{
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.delete<Order>(URI);
  }
}

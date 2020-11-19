import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private uriseg = 'http://localhost:5000/api/inventory';

  constructor(private httpClient: HttpClient) { }

  getAllInventoryDetails():Observable<Inventory[]>{
    const URI = this.uriseg;
    return this.httpClient.get<Inventory[]>(URI);
  }

  getInventoryById(prodId): Observable<Inventory> {
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.get<Inventory>(URI);
  }

  addInventory(prodRef): Observable<any> {
    const URI = this.uriseg;
    return this.httpClient.post<any>(URI, prodRef);   
  }  

  updateInventory(prodRef): Observable<Inventory>{
    const URI = this.uriseg + "/" + prodRef._id;
    return this.httpClient.put<Inventory>(URI, prodRef);
  }

  deleteInventoryById(prodId): Observable<Inventory>{
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.delete<Inventory>(URI);
  }
}

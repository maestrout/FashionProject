import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import {Order } from "../models/order.model";
import { OrderService } from "../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public auth: AuthService, private orderService: OrderService) { }

  prettyItems: string[] = [];
  orders: Array<Order>;

  ngOnInit(): void {
    this.loadOrderInfo();
  }

  loadOrderInfo(): void {
    this.orderService.getAllOrderDetails().subscribe(data=>{this.orders=data
      
      for(var i = 0; i < this.orders.length; i++){
        var items = this.orders[i].items;
        var prettyItem = "";
        for(var j = 0; j < items.length; j++){
          if(j % 2 == 0){
            prettyItem += "Item ID: " + items[j] + " ";
          }else{
            prettyItem += "Quantity: " + items[j];
          }
        }
        this.prettyItems.push(prettyItem);
      }
    }

      );
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Inventory } from '../models/inventory.model';
import { Product } from "../models/product.model";
import { InventoryService } from "../services/inventory.service";
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  inventory: Array<Inventory>
  products:Array<Product> = [];
  flag : boolean = false;
  isLoaded : boolean = false;
  result:string;

  constructor(private inventoryService: InventoryService, private productService: ProductService, public auth: AuthService) { }

  ngOnInit(): void {
    this.loadInventoryInfo();
  }

  loadInventoryInfo(): void {;
    this.inventoryService.getAllInventoryDetails().subscribe(data=>
      {this.inventory=data;
        for (var i = 0; i < this.inventory.length; i++) {
          this.productService.getProductById(this.inventory[i].product).subscribe(pData=>{
            var product = pData;
            this.products.push(product);
          });
        }
        this.isLoaded = true;
      });
  }


}

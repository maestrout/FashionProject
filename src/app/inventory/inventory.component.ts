import { Component, OnInit } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { Product } from "../models/product.model";
import { InventoryService } from "../services/inventory.service";
import { ProductService } from "../services/product.service";
import { FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventoryRef = new FormGroup({
    _id:new FormControl(),
    product: new FormControl(),
    quantity: new FormControl()
  });

  inventoryUpdateRef = new FormGroup({
    _id:new FormControl(),
    product: new FormControl(),
    quantity: new FormControl()
  });

  
  inventory: Array<Inventory>
  products:Array<Product>;
  flag : boolean = false;
  addFlag : boolean = false;
  wantsToAdd: boolean = false;
  wantsToUpdate: boolean = false;
  result:string;

  constructor(private inventoryService: InventoryService, private productService: ProductService, public auth: AuthService) { }

  ngOnInit(): void {
    this.loadInventoryInfo();
    this.loadProductInfo();
  }

  loadInventoryInfo(): void {
    this.flag = true;
    this.inventoryService.getAllInventoryDetails().subscribe(data=>this.inventory=data);
  }

  storeInventoryDetails(): void {
    //console.log(this.inventoryRef.value);
    if(this.wantsToAdd){
    this.inventoryService.addInventory(this.inventoryRef.value).
    subscribe(data=>this.result=data.msg)
    window.location.reload();
    }else{
      this.wantsToAdd = true;
    }
  }

  loadProductInfo(): void {
    this.addFlag = true;
    this.productService.getAllProductDetails().subscribe(data=>this.products=data);
  }

  updateInventoryDetails(){
    if(this.wantsToUpdate){
    this.inventoryService.updateInventory(this.inventoryUpdateRef.value).subscribe(data=>this.result="");
    window.location.reload();
    }else{
      this.wantsToUpdate = true;
    }
  }

  deleteInventory(prodId){
    this.inventoryService.deleteInventoryById(prodId).subscribe(data=>this.result="");
    window.location.reload();
  }

}

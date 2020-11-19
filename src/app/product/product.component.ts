import { Component, OnInit } from '@angular/core';
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Array<Product>;
  flag : boolean = false;
  wantsToAdd: boolean = false;
  wantsToUpdate: boolean = false;
  result:string;

  productRef = new FormGroup({
    _id:new FormControl(),
    name: new FormControl(),
    details: new FormControl(),
    type: new FormControl(),
    image: new FormControl(),
    price: new FormControl()
  });

  productUpdateRef = new FormGroup({
    _id:new FormControl(),
    name: new FormControl(),
    details: new FormControl(),
    type: new FormControl(),
    image: new FormControl(),
    price: new FormControl()
  });

  constructor(private productService: ProductService, public auth: AuthService) { }

  ngOnInit(): void {
    this.loadProductInfo();
  }

  loadProductInfo(): void {
    this.flag = true;
    this.productService.getAllProductDetails().subscribe(data=>this.products=data);
  }

  storeProductDetails(): void {
    //console.log(this.productRef.value);
    if(this.wantsToAdd){
    this.productService.addProduct(this.productRef.value).
    subscribe(data=>this.result=data.msg)
    window.location.reload();
    }else{
      this.wantsToAdd = true;
    }
  }

  updateProductDetails(){
    if(this.wantsToUpdate){
    this.productService.updateProduct(this.productUpdateRef.value).subscribe(data=>this.result="");
    window.location.reload();
    }else{
      this.wantsToUpdate = true;
    }
  }

  deleteProduct(prodId){
    this.productService.deleteProductById(prodId).subscribe(data=>this.result="");
    window.location.reload();
  }

}

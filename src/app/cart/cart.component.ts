import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from "../models/product.model";
import { InventoryService } from "../services/inventory.service";
import { Inventory } from '../models/inventory.model';
import { Item } from "../models/item.model";
import { ProductService } from "../services/product.service";
import { OrderService } from "../services/order.service";
import { AuthService } from '../auth/auth.service';
import { Order } from "../models/order.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Item[] = [];
  total: number = 0;
  isLoaded : boolean = false;
  checkedOut: boolean = false;
  
  inventory: Array<Inventory>;
  errorMessage: string;
  result: String;

	constructor(
		private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private inventoryService: InventoryService,
    public auth: AuthService,
    private orderService: OrderService
	) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {
        var item;
        this.productService.getProductById(id).subscribe(data=>{
          item = new Item(
           data, 1);
          this.addtoCart(item, id);
        });
			} else {
				this.loadCart();
			}
		});
  }
  
  addtoCart(item, id):void{
    //creat cart
    if (localStorage.getItem('cart' + this.auth.getUsername()) == null) {
      let cart: any = [];
      cart.push(JSON.stringify(item));
      localStorage.setItem('cart' + this.auth.getUsername(), JSON.stringify(cart));
    } else {
      let cart: any = JSON.parse(localStorage.getItem('cart' + this.auth.getUsername()));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let cartItem: Item = JSON.parse(cart[i]);
        if (cartItem.product._id == id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart' + this.auth.getUsername(), JSON.stringify(cart));
      } else {
        let cartItem: Item = JSON.parse(cart[index]);
        cartItem.quantity += 1;
        cart[index] = JSON.stringify(cartItem);
        localStorage.setItem("cart" + this.auth.getUsername(), JSON.stringify(cart));
      }
    }
    this.loadCart();
  }

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart' + this.auth.getUsername()));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
    }
    this.isLoaded = true;
	}

	remove(id: number): void {
		let cart: any = JSON.parse(localStorage.getItem('cart' + this.auth.getUsername()));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart" + this.auth.getUsername(), JSON.stringify(cart));
		this.loadCart();
	}
	//cartInfo:any;
	checkOut() {
       let cart: any = JSON.parse(localStorage.getItem('cart' + this.auth.getUsername()));
       var items = Array<number>();
       var failed = false;
       this.inventoryService.getAllInventoryDetails().subscribe(data=>{
        this.inventory = data;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = JSON.parse(cart[i]);
            //IF STATEMENT Checking if enough in stock
            for(var j = 0; j < this.inventory.length; j++){
                if(item.product._id == this.inventory[j].product){
                  if(this.inventory[j].quantity - item.quantity < 0){
                    this.errorMessage = `We're sorry, we do not have enough stock for item ${item.product._id}`
                    failed = true;
                    break;
                  }else{
                    this.inventory[j].quantity -= item.quantity;
                    items.push(item.product._id);
                    items.push(item.quantity);
                  }
                }
            }
            if(failed){
              break;
            }
        }
        if(!failed){
        var order = new Order(Date.now(),this.auth.getUsername(), items, this.total);
        console.log(order);
        this.orderService.addOrder(order).subscribe(data=>this.result=data.msg);
        for(var j = 0; j < this.inventory.length; j++){

          this.inventoryService.updateInventory(this.inventory[j]).subscribe(data=>this.result="");;
                
        }
        this.checkedOut = true;
        localStorage.removeItem('cart' + this.auth.getUsername());
        this.errorMessage = "Thank you for your purchase! We appreciate your support :)" 
        }
       })

      //this.cartInfo= cart;
      //console.log(cart);

	}

}

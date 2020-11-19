import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:Array<User>;
  flag : boolean = false;
  result:string;

  constructor(public auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.userService.getAllUserDetails().subscribe(data=>{this.users=data;
      this.flag = true;});
  }

  deleteUser(prodId){
    this.userService.deleteUserById(prodId).subscribe(data=>this.result="");
    window.location.reload();
  }

}

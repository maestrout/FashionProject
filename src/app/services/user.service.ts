import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uriseg = 'http://localhost:5000/api/users';

  constructor(private httpClient: HttpClient) { }

  getAllUserDetails():Observable<User[]>{
    const URI = this.uriseg;
    return this.httpClient.get<User[]>(URI);
  }

  getUserById(prodId): Observable<User> {
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.get<User>(URI);
  }

  deleteUserById(prodId): Observable<User>{
    const URI = this.uriseg + "/" + prodId;
    return this.httpClient.delete<User>(URI);
  }
}

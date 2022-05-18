import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  createdRegIdOrError = new Subject<string>();
  sendOTP = new Subject<any>();
  verifyOTP = new Subject<boolean>();
  VerifyLogin = new Subject<any>();
  getToken = new Subject<string>();
  isLoginSuccess = new Subject<boolean>();
  isUserLoggedIn = new Subject<boolean>();
  getUserName = new Subject<string>();
  getAllProducts = new Subject<any>();
  user: string;

  isLoggedIn(){
    if(sessionStorage.getItem('userName') != null){
      console.log(sessionStorage.getItem('userName'));
      return true;
    }
  }

}

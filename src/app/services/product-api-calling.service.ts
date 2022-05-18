import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataStorageService } from "./data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductApiCallingService{

  constructor(private http: HttpClient, private dataStorage: DataStorageService){}

  getAllProducts(){
    return this.http.get('http://localhost:8080/getAllProducts').subscribe(
      data => {
        this.dataStorage.getAllProducts.next(data);
      }
    )
  }
}

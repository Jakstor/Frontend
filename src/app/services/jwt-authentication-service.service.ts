import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationServiceService {

  constructor(private http: HttpClient, private dataStorage: DataStorageService) { }

  authenticationToken(username, password){
    username = 'Akash';
    password = 'akash';
    return this.http.post<any>('http://localhost:8080/authenticate',{username,password}).subscribe(
        data=> {
          sessionStorage.setItem('Token',data.token);
        }
    );
  }

  // .subscribe(
  //   data => {
  //     console.log(data);
  //     let token = new TokenModel();
  //     // if(token.token){
  //       token.token = data.token;
  //     // }
  //   }
  // )


}


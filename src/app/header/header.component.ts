import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  showUserName = false;
  userName: string;

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.checkLogin();
    this.isUserLoggedIn();
    this.getUserName();
    if(sessionStorage.getItem('userName') != null){
      this.userName = sessionStorage.getItem('userName');
      this.showUserName = true;
    }
  }

  checkLogin(){
    this.dataStorage.isLoginSuccess.subscribe(
      data => {
        if(data){
          this.isLoggedIn = true;
          this.showUserName = true;
          this.getUserName();
        }
        else{
          this.isLoggedIn = false;
          this.showUserName = false;
        }
      }
    );
  }

  isUserLoggedIn(){
    this.isLoggedIn = this.dataStorage.isLoggedIn();
    console.log(this.isLoggedIn);

  }

  getUserName(){
    this.dataStorage.getUserName.subscribe(
      data => {
        this.userName = data;
        this.showUserName = true;
      }
    );
  }

  // getUser(){
  //   this.dataStorage.userName.subscribe(
  //     data => {
  //       this.showUserName = true;
  //       this.userName = data;
  //     }
  //   );
  // }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private dataStorage: DataStorageService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('userName');
    this.dataStorage.isLoginSuccess.next(false);
    // this.dataStorage.isUserLoggedIn.next(false);
    // setTimeout(() => {
    //   this.router.navigate(['/']);
    // },5000);
  }

  onHome(){
    this.router.navigate(['/']);
  }

}

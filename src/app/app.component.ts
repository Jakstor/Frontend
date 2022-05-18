import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './services/data-storage.service';
import { JwtAuthenticationServiceService } from './services/jwt-authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'test-project-app';

  constructor(private jwt: JwtAuthenticationServiceService, private dataStorage: DataStorageService){}

  ngOnInit(): void {
    this.jwt.authenticationToken('Akash','akash');
    console.log("app-root");
    this.dataStorage.isLoggedIn();
  }
}

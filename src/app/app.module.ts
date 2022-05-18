import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { LoginComponent } from './login/login.component';
import { HttpIntercepterAuthService } from './services/http-interceptor-auth.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    LoginOrRegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

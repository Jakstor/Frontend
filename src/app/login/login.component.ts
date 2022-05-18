import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginModel } from '../Model/login.model';
import { ApiCallingService } from '../services/login-api-calling.service';
import { DataStorageService } from '../services/data-storage.service';
import { JwtAuthenticationServiceService } from '../services/jwt-authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('list1',[
      state('in', style({
        opacity:1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateX(-100px)'
        }),
        animate(800)])
    ]),
    trigger('openClose',[
      state('open', style({
        opacity:1,
        transform: 'translateY(0)'
      })),
      state('close', style({
        opacity:0,
        transform: 'translateY(-100px)'
      })),
      transition('open => close', [animate(500)]),
      transition('close => open', [animate(500)]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: LoginModel;
  errorMessage = 'Invalid username or password';
  showError = false;
  showInvalidError = false;
  stateCheck = 'close';
  token: string;


  constructor(private apiCall: ApiCallingService, private dataStorage: DataStorageService, private router: Router, private jwt:JwtAuthenticationServiceService) { }

  ngOnInit(): void {
    this.validForm();
    this.token = sessionStorage.getItem('Token');
  }

  private validForm(){
    let emailOrMobile = '';
    let password = '';

    this.loginForm = new FormGroup({
      'emailOrMobile': new FormControl(emailOrMobile, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }

  onSubmit(){
    this.loginModel = new LoginModel(
      this.loginForm.value.emailOrMobile,
      this.loginForm.value.password
    )
    this.apiCall.emailLogin(this.loginForm.value.emailOrMobile, this.loginForm.value.password);
    this.dataStorage.VerifyLogin.subscribe(
      data => {
        if(data.login == true || data.login == false){
          if(data.login){
            this.router.navigate(['/']);
            sessionStorage.setItem('userName',data.userName);
            this.dataStorage.isLoginSuccess.next(true);
            this.dataStorage.getUserName.next(sessionStorage.getItem('userName'));
          }
          else{
            this.showError = true;
            this.stateCheck = 'open';
          }
        }
        else{
          this.showInvalidError = true;
          this.stateCheck = 'open';
        }
      }
    )
    this.onReset();
  }

  onReset(){
    setTimeout(()=>{
      this.stateCheck = 'close';
    },10000);
    this.showInvalidError = false;
    this.showError = false;
    this.loginForm.reset();
  }

  onRegister(){
    this.router.navigate(['/register']);
  }
}

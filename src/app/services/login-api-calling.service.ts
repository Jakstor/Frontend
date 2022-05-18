import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../Model/register.model';
import { DataStorageService } from './data-storage.service';
import { JwtAuthenticationServiceService } from './jwt-authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallingService {

  constructor(private http: HttpClient, private dataStorage: DataStorageService, private jwtService: JwtAuthenticationServiceService) { }

  register(regModel: RegisterModel){
    return this.http.post('http://localhost:8080/saveData', regModel).subscribe(
      (regId:number) => {
        // this.dataStorage.setRegId(regId);
        this.dataStorage.createdRegIdOrError.next(regId.toString());
      },
      error => {
        let errorMessage = 'Something went wrong'
        console.log(error);
        switch(error.error.message){
          case 'Email-Id already exist':
            errorMessage = 'Email-Id already exist';
        }
        this.dataStorage.createdRegIdOrError.next(errorMessage);
      }
    )
  }

  sendOTP(phn: string){
    const headers = {'mobileNumber':phn};
    return this.http.post('http://localhost:8086/sendSms',null,{headers}).subscribe(
      data => {
        this.dataStorage.sendOTP.next(data);
      },
      error => {
        this.dataStorage.sendOTP.next(error.error.message);
      }
    );
  }

  verifyOTP(otp: string){
    const headers = {'OTP':otp};
    this.http.post('http://localhost:8086/verifyOTP',null,{headers}).subscribe(
      (res:boolean) => {
        this.dataStorage.verifyOTP.next(res);
      }
    )
  }

  emailLogin(email: string, password: string){
    const headers = {'emailId': email, 'password':password};
    this.http.get('http://localhost:8080/email-login',{headers}).subscribe(
      (res) => {
        this.dataStorage.VerifyLogin.next(res);
      },
      error => {
        this.dataStorage.VerifyLogin.next(error);
      }
    )
  }

}

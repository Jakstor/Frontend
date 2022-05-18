import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from '../Model/register.model';
import { ApiCallingService } from '../services/login-api-calling.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
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
    ]),
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
  ]
})
export class RegisterComponent implements OnInit {

  @ViewChild('otp') OTP;

  isPasswordMisMatch = false;
  regForm!: FormGroup;
  regModel: RegisterModel;
  newRegId: number;
  showRegId = false;
  stateCheck = 'close';
  showError = false;
  errorMessage = '';
  showRegisterButton = false;
  otpBox = false;
  enableProceed = true;
  enableRegister = false;
  otpAlert = false;
  phoneNumber: string;
  showOtpMessage = false;
  otpMessageValid = false;
  otpMessageInValid = false;
  otpError = false;
  otpErrorMessage: string;
  showReset = false;

  constructor(private apiCalls: ApiCallingService, private dataStorage: DataStorageService, private router: Router) { }

  ngOnInit(): void {
    this.validForm();
  }

  private validForm (){
    let fName = '';
    let mName = '';
    let lName = '';
    let emailId = '';
    let phone = '';
    let newPass = '';
    let confPass = '';

    this.regForm = new FormGroup({
      'firstName': new FormControl(fName, Validators.required),
      'middleName': new FormControl(mName),
      'lastName': new FormControl(lName, Validators.required),
      'email': new FormControl(emailId,[Validators.required, Validators.email]),
      'phone': new FormControl(phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10),this.checkPhoneNumber]),
      'newPassword': new FormControl(newPass,[Validators.required, Validators.pattern(/[a-zA-Z0-9]{8}/)]),
      'confirmPassword': new FormControl(confPass, Validators.required)
    },this.checkPassword);

  }

  onReset(){
    setTimeout(() => {
      this.stateCheck = 'close';
    },10000)
    this.showRegisterButton = false;
    this.otpBox = false;
    this.showOtpMessage = false;
    this.enableProceed = true;
    this.regForm.reset();
  }

  onProceed(){
    this.showRegId = false;
    this.showError = false;
    this.phoneNumber = "+91"+this.regForm.value.phone;
    this.apiCalls.sendOTP(this.phoneNumber);
    this.dataStorage.sendOTP.subscribe(
      res => {
        if(res == true || res == false){
          if(res){
            this.enableProceed = !this.enableProceed;
            this.otpBox = true;
            this.showRegisterButton = true;
            this.otpError = false;
            this.otpAlert = true;
            this.stateCheck = 'open';
          }
          else{
            this.showReset = true;
            this.otpBox = false;
            this.showRegisterButton = false;
            this.otpAlert = false;
            this.otpError = true;
            this.otpErrorMessage = 'Invalid phone number. Unable to send OTP'
            this.stateCheck = 'open';
          }
        }
        else{
          this.showReset = true;
          this.otpBox = false;
          this.showRegisterButton = false;
          this.otpAlert = false;
          this.otpError = true;
          this.otpErrorMessage = 'Something went wrong'
          this.stateCheck = 'open';
        }
      }
    )
    setTimeout(() => {
      this.stateCheck = 'close';
    },10000)
  }

  onVerifyOTP(otp: string){
    this.otpAlert = false;
    this.apiCalls.verifyOTP(otp);
    this.dataStorage.verifyOTP.subscribe(
      (res:boolean) => {
        if(res){
          this.showOtpMessage = true;
          this.otpMessageValid = true;
          this.enableRegister = true;
        }
        else{
          this.showOtpMessage = true;
          this.otpMessageValid = false;
          this.otpMessageInValid = true;
        }
      }
    )
    this.clearOTPField();
  }

  clearOTPField(){
    this.OTP.nativeElement.value = '';
  }

  onRegister(){
    this.regModel = new RegisterModel(
      this.regForm.value.firstName,
      this.regForm.value.middleName,
      this.regForm.value.lastName,
      this.regForm.value.email,
      this.regForm.value.phone,
      this.regForm.value.newPassword,
      this.regForm.value.confirmPassword
    );
    console.log(this.regModel);
    this.apiCalls.register(this.regModel);
    this.dataStorage.createdRegIdOrError.subscribe(
      regIdOrError => {
        let regId:number = +regIdOrError;
        if(!isNaN(regId)){
          this.newRegId = regId;
          this.showRegId = true;
          this.stateCheck = 'open';
        }
        else{
          // console.log(regIdOrError);
          this.errorMessage = regIdOrError;
          this.showError = true;
          this.stateCheck = 'open';
        }
      }
    )
    this.onReset();
  }

  onResetForm(){
    this.showReset = false;
    this.regForm.reset();
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  checkPassword(group: FormGroup){
    const password = group.get('newPassword').value;
    const confPassword = group.get('confirmPassword').value;

    return password === confPassword ? null : {'notSame': true};
  }

  checkPhoneNumber(control: FormControl){
    const phnNum = control.value;
    const validPhn: number = +phnNum;

    return isNaN(validPhn) ? {'notPhn': true} : null;
  }
}

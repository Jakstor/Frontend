export class LoginModel{
  public emailOrMobile: String;
  public password: String;

  constructor(emailOrMobile: String, password: String){
    this.emailOrMobile = emailOrMobile;
    this.password = password;
  }
}

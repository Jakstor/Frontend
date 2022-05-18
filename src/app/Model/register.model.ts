export class RegisterModel{
  public firstName: String;
  public middleName: String;
  public lastName: String;
  public emailId: String;
  public phone: String
  public newPassword: String;
  public confirmPassword: String;

  constructor(firstName: String, middleName: String, lastName: String, email: String, phone: String, newPassword: String, confirmPassword: String){
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.emailId = email;
    this.phone = phone;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}

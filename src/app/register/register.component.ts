import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  repassword: string = '';
  hashPassword: any;
  message: string;

  isAccountMatch = null;
  isAccountEmailExist = null;
  newMessage = false;
  submitted = false;

  isPasswordAndRepasswordMatch = false;
  isUserExist = false;

  userRef: any;

  account: Account;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private loginService: LoginService,
  ) { }

  ngOnInit() {


  }

  checkPassword(event: any) {
    if (this.repassword === event.target.value) {
      this.isPasswordAndRepasswordMatch = true;
    } else {
      this.isPasswordAndRepasswordMatch = false;
    }
  }

  checkEmailExist(event: any) {

  }

  checkRepassword(event: any) {
    if (this.password === event.target.value) {
      this.isPasswordAndRepasswordMatch = true;
    } else {
      this.isPasswordAndRepasswordMatch = false;
    }
  }

  onSubmit() {

    console.log(this.email);
    console.log(this.password);
    console.log(this.repassword);



    if (this.isPasswordAndRepasswordMatch == true) {
      if (this.isUserExist == false) {
        this.hashPassword = this.loginService.stringToMd5(this.password);
        this.account = new Account(this.email, this.hashPassword);
        this.userRef = this.db.list("accounts").push(this.account);
        alert('Register Successful !!!');
        this.navigateLogin();
      }

    }

  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }

}

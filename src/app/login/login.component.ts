import { Component, OnInit, Inject, Injectable, Output } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Product } from '../model/product';
import { Account } from '../model/account';
import { EventEmitter } from 'events';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  hashPassword: any;
  message: string;

  isAccountMatch = null;
  isAccountEmailExist = null;
  newMessage = false;
  submitted = false;


  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {


    // localStorage.setItem("logging", "false");
    console.log("Logging: " + localStorage.getItem("logging"));
  }

  onSubmit() {

    if ((this.email == '') || (this.password == '')) {
      this.newMessage = true;
      this.message = "Please enter your account !!!";
      return;
    } else {

      this.hashPassword = this.loginService.stringToMd5(this.password);

      this.loginService.accountRef().subscribe(
        login => {
          login.forEach(account => {
            if ((account['user_email'] === this.email && account['user_password'] !== this.hashPassword)) {
              this.isAccountMatch = false;
              this.isAccountEmailExist = true;

              this.newMessage = true;
              this.message = "Wrong Password !!!";

            } else if ((account['user_email'] !== this.email && account['user_password'] !== this.hashPassword)) {
              this.isAccountMatch = false;
              this.isAccountEmailExist = false;

              this.newMessage = true;
              this.message = "Wrong Something !!!";

            } else if ((account['user_email'] !== this.email && account['user_password'] === this.hashPassword)) {
              this.isAccountMatch = false;
              this.isAccountEmailExist = false;

              this.newMessage = true;
              this.message = "Account not found on my database !!!";
            } else if (account['user_email'] === this.email && account['user_password'] === this.hashPassword) {
              this.isAccountMatch = true;
              this.isAccountEmailExist = true;

              localStorage.setItem("logging", "true");
              localStorage.setItem("user_email", account['user_email']);

              this.newMessage = true;
              this.message = "Login Success !!!";


              this.router.navigate(['/home']);
              alert("Hello user: " + account['user_email'] + ", welcome to my shop :) ");


            }

            console.log(this.isAccountMatch);

            console.log(account['user_email'] + " " + account['user_password']);

          });


        });


    }
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }

}

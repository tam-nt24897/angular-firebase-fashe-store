import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Product } from '../model/product';
import { Account } from '../model/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  hashPassword: any;

  isAccountMatch = null;
  isAccountEmailExist = null;

  constructor(private loginService: LoginService) { }

  ngOnInit() {

  }

  login() {

    this.hashPassword = this.loginService.stringToMd5(this.password);

    this.loginService.accountRef().subscribe(
      lo => {
        lo.forEach(account => {
          if (account['user_email'] === this.email && account['user_password'] === this.hashPassword) {
            this.isAccountMatch = true;
            this.isAccountEmailExist = true;
            console.log(this.isAccountMatch);

          } else if ((account['user_email'] !== this.email && account['user_password'] !== this.hashPassword)) {
            this.isAccountMatch = false;
            this.isAccountEmailExist = true;
            console.log(this.isAccountMatch);
          } else {
            this.isAccountEmailExist = false;
          }

        });
      });

    if (this.isAccountEmailExist === false) {
      alert('User Not Exist ! Please check another email');
    }
  }

}

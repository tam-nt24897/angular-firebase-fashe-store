import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  logging = false;
  emailUser: string = '';

  constructor(private router: Router) {
    this.logging = JSON.parse(localStorage.getItem("logging"));
  }

  ngOnInit() {
    console.log("Logging: " + localStorage.getItem("logging"));
    this.emailUser = localStorage.getItem("user_email");
  }

  logout(): void {
    localStorage.setItem("logging", "false");
    this.logging = JSON.parse(localStorage.getItem("logging"));
    localStorage.removeItem("logging");
    localStorage.removeItem("user_email");
    console.log("Here " + this.logging);
    alert("Logout is successful");

  }

  isAdmin() {
    alert("Admin");
    this.router.navigate(['/dashboard']);
  }



}

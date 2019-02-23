import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(db: AngularFireDatabase, homeService: HomeService) {


    // const courses$: AngularFireList<any> = db.list('products');

    // courses$.valueChanges().subscribe(
    //   val => console.log(val)
    // );


  }

  ngOnInit() {
  }





}

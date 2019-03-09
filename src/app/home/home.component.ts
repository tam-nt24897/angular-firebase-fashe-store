import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HomeService } from '../service/home.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featureProducts$: any;
  constructor(db: AngularFireDatabase, private homeService: HomeService) {


  }



  ngOnInit() {

    this.homeService.getFeatureProducts().valueChanges().subscribe(fpr => {
      console.log(fpr);
      this.featureProducts$ = fpr;

    });

  }





}

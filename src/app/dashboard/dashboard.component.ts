import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Product } from '../model/product';
import { DashboardService } from '../service/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productsDash$: any;
  productsSum: any;
  productSearch: any;

  textSearch: string;

  allProducts: Product[];
  filteredProduct: Product[];

  filteredItems: any;
  items: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {

    this.dashboardService.findAllProducts()
      .valueChanges()
      .subscribe(pro => {
        this.productsDash$ = pro;
        this.filteredProduct = pro;
        this.allProducts = pro;
        console.log();
      });

  }

  search(value) {
    this.textSearch = value;
    this.filteredProduct = this.allProducts.filter(product => product.name.includes(this.textSearch));
    // console.log(this.textSearch);
  }

}

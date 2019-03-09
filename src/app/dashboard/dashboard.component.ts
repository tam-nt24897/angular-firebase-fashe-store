import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Product } from '../model/product';
import { DashboardService } from '../service/dashboard.service';
import { Observable } from 'rxjs';
import { PagerService } from '../service';
import * as _ from 'underscore';

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
    private dashboardService: DashboardService,
    private pagerService: PagerService,
  ) { }

  // array of all items to be paged
  private allItems: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {

    this.dashboardService.findAllProducts()
      .valueChanges()
      .subscribe(pro => {
        this.productsDash$ = pro;
        this.allItems = this.filteredProduct = pro;
        this.allProducts = pro;
        this.setPage(1);
        console.log();
      });

  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

    //Scroll Smooth to Top
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
    //Scroll Smooth to Top
  }

  search(value) {
    this.textSearch = value;
    this.pagedItems = this.allProducts.filter(product => product.name.includes(this.textSearch));
    // console.log(this.textSearch);
  }



}

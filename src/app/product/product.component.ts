import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { AngularFireList, AngularFireDatabase, snapshotChanges, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';
import { PagerService } from '../service';
import * as _ from 'underscore';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { log } from 'util';
import { Color } from '../model/color';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private db: AngularFireDatabase,
    private productService: ProductService,
    private pagerService: PagerService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {

  }

  // array of all items to be paged
  private allItems: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  products$: any;

  textSearch: string;

  allProducts: any;
  filteredProduct: Product[];

  sortingByPrice: any;

  selectedPrice: string = '';
  selectedPrice2: string = '';

  ngOnInit() {

    this.productService.findAllProducts()
      .valueChanges()
      .subscribe(pro => {
        this.allItems = pro;
        this.allProducts = pro;
        // initialize to page 1
        this.setPage(1);
      });

    this.activatedRoute.params.subscribe(params => {
      var category = params['name'];

      if (category) {

        this.productService.findProductByCategory(category)
          .valueChanges()
          .subscribe(
            cate => {

              if (cate.length > 0) {
                this.allItems = cate;
                // initialize to page 1
                this.setPage(1);
              } else {
                this.allItems = [];
                this.toastr.info("Products in categories is empty", "Category Information");
              }
            });
      }
    });



  }

  getSelectedSortByPrice(event: any) {
    this.selectedPrice = event.target.value;
    console.log(this.selectedPrice);


    if (this.selectedPrice === "lowtohigh") {

      this.productService.sortProductLowToHigh().valueChanges().subscribe(s => this.pagedItems = s);
      console.log("low");

    } else if (this.selectedPrice === "hightolow") {
      this.productService.sortProductHighToLow().valueChanges().subscribe(s => this.pagedItems = s);
      console.log("high");
    } else {

      this.productService.findAllProducts()
        .valueChanges()
        .subscribe(pro => {
          this.allItems = pro;
          this.allProducts = pro;
          // initialize to page 1
          this.setPage(1);
        });
    }

  }

  getSelectedSortByPrice2(event: any) {
    this.selectedPrice2 = event.target.value;
    console.log(this.selectedPrice2);

  }

  getProductForSortByPrice(price1: string, price2: string) {
    if (this.selectedPrice !== "default") {

    } else if (this.selectedPrice2 !== "default") {

    } else {

    }
  }

  search(value) {
    this.textSearch = value;
    this.pagedItems = this.allProducts.filter(product => product.name.includes(this.textSearch));
    // console.log(this.textSearch);
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}

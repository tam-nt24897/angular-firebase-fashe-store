import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../service/product-detail.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productUrl: string;

  product$: any;

  productKey: string;

  constructor(
    route: ActivatedRoute,
    private db: AngularFireDatabase,
    private productDetailService: ProductDetailService) {

    this.productUrl = route.snapshot.params.id;

    product : Product;
  }

  ngOnInit() {

    this.productDetailService.findProductDetailByUrl(this.productUrl)
      .subscribe(pro => {
        this.productKey = pro[0].key;
        // console.log('Key Products');
        // console.log(this.productKey);

        this.productDetailService.getDetailsByKey(this.productKey)
          .subscribe(pro => {
            this.product$ = <Product>pro;
            console.log(this.product$);
          });
      });
  }

}

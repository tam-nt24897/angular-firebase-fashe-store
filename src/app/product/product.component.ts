import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { AngularFireList, AngularFireDatabase, snapshotChanges, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private productService: ProductService) {

    // const products$: AngularFireList<any> = db.list('products');
    // products$.valueChanges().subscribe(val => {
    //   console.log(val);
    // }
    // );

  }

  products$: Product[];

  ngOnInit() {

    this.productService.findAllProducts()
      .valueChanges()
      .subscribe(pro => {
        this.products$ = pro;
      });
    console.log(this.products$);

  }

}

import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { Color } from '../model/color';
import { Size } from '../model/Size';
import { ProductDetailService } from '../service/product-detail.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-product-create',
  templateUrl: './dashboard-product-create.component.html',
  styleUrls: ['./dashboard-product-create.component.css']
})
export class DashboardProductCreateComponent implements OnInit {

  productRef: AngularFireObject<any>;

  product$: any;
  categories$: any;
  colors$: any;
  types$: any;
  sizes$: any;

  id_user: any;
  description: string;

  //Product Create
  productName: string;
  productUrl: string;
  productAddInfo: string;
  productCategories: any;
  productColor: any;
  productType: any;
  productSize: any;
  productDescription: string;
  productPercentDiscount: number;
  productPrice: number;
  productQuantity: number;
  productTags: string;
  productImage: string = "item-02.jpg";
  productReviews: string[] = [
    this.id_user = "1",
    this.description = "Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat"
  ]
  //Product Create

  constructor(
    private productDetailService: ProductDetailService,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {

    this.productDetailService.getAllCategories()
      .subscribe(cate => {
        this.categories$ = <Category[]>cate;
        // console.log(this.categories$);
      });

    this.productDetailService.getAllSizes()
      .subscribe(size => {
        this.sizes$ = <Size[]>size;
        // console.log(this.sizes$);
      });

    this.productDetailService.getAllColors()
      .subscribe(color => {
        this.colors$ = <Color[]>color;
        // console.log(this.colors$);
      });



    this.productDetailService.getAllTypes()
      .subscribe(type => {
        this.types$ = <Category[]>type;
        // console.log(this.types$);
      });


  }

  onCreate() {

    this.product$ = new Product(
      this.productName,
      this.productUrl,
      this.productPrice,
      this.productSize,
      this.productColor,
      this.productQuantity,
      this.productType,
      this.productImage,
      this.productCategories,
      this.productDescription,
      this.productAddInfo,
      this.productReviews,
      this.productPercentDiscount,
      this.productTags
    );
    console.log(this.product$);

    this.db.database.ref('products').push(this.product$);

    this.router.navigate(['/dashboard']);
    alert('Create Successful');

  }



}

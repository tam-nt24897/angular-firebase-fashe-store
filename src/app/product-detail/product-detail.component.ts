import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../service/product-detail.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from '../model/category';
import { Size } from '../model/Size';
import { Color } from '../model/color';
import { ProductCart } from '../model/productCart';
import { ProductCartService } from '../service/productCart.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {


  productUrl: string;

  product$: any;

  productKey: string;

  product_quantity = new FormControl('');

  categories$: any;
  colors$: any;
  types$: any;
  sizes$: any;

  //Binding model
  productName: string;
  productPrice: number;
  productSize: any;
  productColor: string;
  productQuantity: number;
  productImage: string;
  //Binding model

  selectedSize: string = '';

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private productCartService: ProductCartService,
    private productDetailService: ProductDetailService) {

    this.productUrl = route.snapshot.params.id;

    product: Product;
  }

  ngOnInit() {


    this.product_quantity.setValue(0);
    // console.log(this.product_quantity.value);

    this.productDetailService.findProductDetailByUrl(this.productUrl)
      .subscribe(pro => {
        this.productKey = pro[0].key;
        // console.log('Key Products');
        console.log(this.productKey);

        this.productDetailService.getDetailsByKey(this.productKey)
          .subscribe(pro => {
            this.product$ = <Product>pro;

            this.productName = this.product$.name;
            this.productPrice = this.product$.price;
            this.productImage = this.product$.image;

            // console.log(this.productName);
          });
      });

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

  // getValueFromSelect(value) {
  //   console.log(value);

  // }

  onAddToCart(productSize, productColor) {

    this.productQuantity = this.product_quantity.value;

    console.log(this.productName);
    console.log(this.productPrice);
    console.log(productSize);
    console.log(productColor);
    console.log(this.productQuantity);
    console.log(this.productImage);

    // this.cartItem = new CartItem(
    //   this.productName,
    //   this.productPrice,
    //   productSize,
    //   productColor,
    //   this.productQuantity,
    //   this.productImage,
    //   this.productPrice * this.productQuantity
    // );


  }





  addQuantity() {
    this.product_quantity.setValue(this.product_quantity.value + 1);
  }

  minusQuantity() {
    this.product_quantity.setValue(this.product_quantity.value - 1);
  }




}

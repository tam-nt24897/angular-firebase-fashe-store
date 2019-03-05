import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from '../service/product-detail.service';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../model/category';
import { Color } from '../model/color';
import { Size } from '../model/Size';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-dashboard-product-edit',
  templateUrl: './dashboard-product-edit.component.html',
  styleUrls: ['./dashboard-product-edit.component.css']
})
export class DashboardProductEditComponent implements OnInit {

  productRef: AngularFireList<any> = null;

  product$: any;
  categories$: any;
  colors$: any;
  types$: any;
  sizes$: any;

  productKey: string;

  compareFn: any;

  selectedCategory: any;

  id_user: any;
  description: string;

  //Product Edit
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
  productReviews: any =
    [{
      id_user: "1",
      description: "Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat"
    }]
  //Product Edit

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private productDetailService: ProductDetailService
  ) {

    this.productRef = this.db.list('products');
    this.productUrl = route.snapshot.params.id;
  }

  ngOnInit() {

    this.productDetailService.findProductDetailByUrl(this.productUrl)
      .subscribe(pro => {
        this.productKey = pro[0].key;
        // console.log('Key Products');
        console.log(this.productKey);

        this.productDetailService.getDetailsByKey(this.productKey)
          .subscribe(pro => {
            this.product$ = <Product>pro;

            this.productName = this.product$.name;
            this.productAddInfo = this.product$.add_info;
            this.productCategories = this.product$.categories;
            this.productSize = this.product$.size;
            this.productColor = this.product$.color;
            this.productType = this.product$.type;
            this.productDescription = this.product$.description;
            this.productPercentDiscount = this.product$.percent_discount;
            this.productPrice = this.product$.price;
            this.productQuantity = this.product$.quantity;
            this.productTags = this.product$.tags;
            this.productImage = this.product$.image;

            console.log(this.productCategories);
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

  onUpdate() {

    console.log(this.productCategories);
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

    this.db.object(`/products/${this.productKey}`).update(this.product$);

    this.router.navigate(['/dashboard']);
  }

  onDelete() {
    // promise1 = new Promise(function(resolve, reject) {
    //   resolve('Success!');
    // });
    this.productRef.remove(this.productKey)
      .catch(
        function error(arg) {
          alert('Remove Error: ' + arg);
        }
      )
      .then(
        function success() {
          alert('Remove Success!!!');
          // this.router.navigate(['/dashboard']);
        }
      );
  }

}

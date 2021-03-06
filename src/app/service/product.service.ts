import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';
import { map } from 'rxjs/operators';
import { query } from '@angular/core/src/render3';
import { Color } from '../model/color';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
    { // Load Scripts
      this.loadScript('../assets/vendor/jquery/jquery-3.2.1.min.js');
      this.loadScript('../assets/js/add-cart.js');
      this.loadScript('../assets/vendor/animsition/js/animsition.min.js');
      this.loadScript('../assets/vendor/bootstrap/js/popper.js');
      this.loadScript('../assets/vendor/bootstrap/js/bootstrap.min.js');
      this.loadScript('../assets/vendor/select2/select2.min.js');
      this.loadScript('../assets/js/select2.js');
      this.loadScript('../assets/js/select2-product-detail.js');
      this.loadScript('../assets/vendor/daterangepicker/moment.min.js');
      this.loadScript('../assets/vendor/daterangepicker/daterangepicker.js');

      this.loadScript('../assets/vendor/slick/slick.min.js');
      this.loadScript('../assets/js/slick-custom.js');
      this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
      this.loadScript('../assets/vendor/noui/nouislider.min.js');
      this.loadScript('../assets/js/nouislider.js');
      this.loadScript('../assets/js/main.js');
    }

  }


  products$: AngularFireObject<Product>;



  sortProductLowToHigh() {
    return this.db.list('products', ref => ref.orderByChild('price').limitToFirst(50));
  }

  sortProductHighToLow() {
    return this.db.list('products', ref => ref.orderByChild('price').limitToLast(50));
  }

  findAllProducts(): AngularFireObject<Product> {

    this.products$ = this.db.object('products');
    // // Use snapshotChanges().map() to store the key
    // this.products = this.productRef.snapshotChanges().pipe(map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // }));

    // return this.products.subscribe(val => console.log(val));

    return this.db.object('products');
  }

  getColors(): AngularFireList<Color> {
    return this.db.list('color');
  }

  findProductByCategory(category: string) {
    return this.db.list('products', ref => ref.orderByChild('categories').equalTo(category));
  }



  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}

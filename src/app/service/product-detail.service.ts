import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from '../model/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  productKey: string;
  product$: Observable<Product>;

  dataStr: string;

  products: AngularFireList<any> = null; //  list of objects


  constructor(private db: AngularFireDatabase) {

    { // LOAD SCRIPS PRODUCT-DETAILS

      this.loadScript('../assets/vendor/jquery/jquery-3.2.1.min.js');
      this.loadScript('../assets/js/add-cart.js');
      this.loadScript('../assets/vendor/animsition/js/animsition.min.js');
      this.loadScript('../assets/vendor/bootstrap/js/popper.js');
      this.loadScript('../assets/vendor/bootstrap/js/bootstrap.min.js');
      this.loadScript('../assets/vendor/select2/select2.min.js');
      this.loadScript('../assets/js/select2-product-detail.js');

      this.loadScript('../assets/vendor/slick/slick.min.js');
      this.loadScript('../assets/js/slick-custom.js');
      this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
      this.loadScript('../assets/js/main.js');
    }



  }

  // Update an existing post
  updateProduct(key: string, value: any): void {
    this.products.update(key, value)
      .catch(error => this.handleError(error))
  }

  // Deletes a single post
  deleteProduct(key: string): void {
    this.products.remove(key)
      .catch(error => this.handleError(error))
  }


  findProductDetailByUrl(productUrl: string) {

    const product = this.db.list('products', ref => ref.orderByChild('url').equalTo(productUrl)).snapshotChanges();

    product.subscribe(actions => {
      actions.forEach(action => {
        this.productKey = action.key;
        // console.log(this.productKey);
        // console.log(action.payload.val());
      });
    });

    return product;
  }

  getDetailsByKey(productKey: string) {

    return this.db.object(`products/${productKey}`)
      .valueChanges();

  }

  getAllCategories() {
    return this.db.list('categories').valueChanges();
  }

  getAllColors() {
    return this.db.list('color').valueChanges();
  }

  getAllTypes() {
    return this.db.list('type').valueChanges();
  }

  getAllSizes() {
    return this.db.list('size').valueChanges();
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
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

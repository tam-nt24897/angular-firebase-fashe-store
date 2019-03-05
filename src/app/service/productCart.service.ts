import { Injectable } from '@angular/core';
import { ProductCart } from '../model/productCart';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  private products: ProductCart[];

  constructor() {
    this.products = [
      { id: "0", name: "Herschel supply co 25l", price: 500, size: "M", color: "Black", image: "item-02.jpg" },
      { id: "-LZrGChIG_7E6PCE983t", name: "New item", price: 300, size: "L", color: "White", image: "item-03.jpg" },
      { id: "-LZrDVNPND3JMSgBwzu9", name: "item3", price: 200, size: "XL", color: "Blue", image: "item-04.jpg" },
      { id: "2", name: "item4", price: 200, size: "XL", color: "Blue", image: "item-04.jpg" }
    ];

  }

  findAll(): ProductCart[] {
    return this.products;
  }

  find(id: string): ProductCart {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }


}

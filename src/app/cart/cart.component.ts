import { Component, OnInit } from '@angular/core';
import { ProductCart } from '../model/productCart';
import { ProductCartService } from '../service/productCart.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../model/item';
import { ProductDetailService } from '../service/product-detail.service';
import { Size } from '../model/Size';
import { Color } from '../model/color';
import { Product } from '../model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private items: Item[] = [];
  private total: number = 0;

  sizes$: any;
  colors$: any;

  productSize: any;
  productColor: any;
  productQuantity: number;

  private products: ProductCart[];
  private prod: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailService: ProductDetailService,
    private productCartService: ProductCartService
  ) { }

  ngOnInit() {

    this.products = this.productCartService.findAll();

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

    this.productCartService.getProducts().valueChanges().subscribe(
      s => {
        s.forEach(element => {

          // console.log(element);
          this.prod.push(element);
        });
        console.log(this.prod);
      }
    );

    // localStorage.setItem("cart", JSON.stringify(this.items));
    this.activatedRoute.params.subscribe(params => {
      var id = params['id'];
      if (id) {
        var item: Item = {
          product: this.productCartService.find(id),
          quantity: 1
        };
        if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]) as Item;
            if (item.product.id == id) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            item.quantity += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
        }
        this.loadCart();
      } else {
        this.loadCart();
      }
    });

  }

  changeQuantity(i) {

    // this.total = 0;
    // console.log(this.productQuantity);

    // this.items = [];

    // let cart = JSON.parse(localStorage.getItem('cart'));
    // // cart[i].quantity = this.productQuantity as number;
    // // localStorage.setItem("cart", JSON.stringify(cart));

    // let item = JSON.parse(cart[i]);
    // this.items.push({
    //   product: item.product,
    //   quantity: this.productQuantity
    // });

    // this.total += item.product.price * item.quantity;

    // cart[i] = JSON.stringify(item);
    // localStorage.setItem("cart", JSON.stringify(cart));

    // for (var index = 0; i < cart.length; i++) {
    //   // let item = JSON.parse(cart[i]);
    // }
  }

  loadCart(): void {
    this.total = 0;
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.productColor = item.product.color;
      this.productSize = item.product.size;
      // this.productQuantity = item.quantity;
      this.total += item.product.price * item.quantity;
    }
    console.log(this.items);

  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product.id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }


}

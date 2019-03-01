import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  products$: AngularFireList<Product>;
  constructor(
    private db: AngularFireDatabase
  ) { }


  findAllProducts(): AngularFireList<Product> {
    return this.db.list('products');
  }
}

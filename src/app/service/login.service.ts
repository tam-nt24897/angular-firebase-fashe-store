import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AngularFireDatabase } from '@angular/fire/database';
import { dbData } from 'db-data';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hashPassword: any;

  constructor(private db: AngularFireDatabase) { }

  accountRef() {
    return this.db.list('accounts').valueChanges();
  }

  stringToMd5(input: string) {

    return new Md5().appendStr(input).end();
  }

  checkMd5Match(hash: string) {

    this.hashPassword = new Md5().appendStr(hash).end();
    if (hash === this.hashPassword)
      return true;
    else
      return false;
  }

  checkAccount(email: any, password: string) {

    return this.db.list('accounts', ref =>
      ref.orderByChild('user_email')
        .equalTo(email));
  }
}

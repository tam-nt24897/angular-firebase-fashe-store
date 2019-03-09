import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { HomeService } from './service/home.service';
import { ProductService } from './service/product.service';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Product } from './model/product';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { TopMenuService } from './service/top-menu.service';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './service/dashboard.service';
import { DashboardProductEditComponent } from './dashboard-product-edit/dashboard-product-edit.component';
import { DashboardProductCreateComponent } from './dashboard-product-create/dashboard-product-create.component';
import { CartComponent } from './cart/cart.component';
import { ProductCartService } from './service/productCart.service';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from './service/index';
// Import below modules for NGX Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailComponent,
    LoginComponent,
    TopMenuComponent,
    RegisterComponent,
    DashboardComponent,
    DashboardProductEditComponent,
    DashboardProductCreateComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StorageServiceModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [HomeService, ProductService, TopMenuService, DashboardService, ProductCartService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

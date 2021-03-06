import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProductEditComponent } from './dashboard-product-edit/dashboard-product-edit.component';
import { DashboardProductCreateComponent } from './dashboard-product-create/dashboard-product-create.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'home',
    // redirectTo: '/heroes',
    component: HomeComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product/category/:name',
    component: ProductComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/edit/',
    component: DashboardComponent
  },
  {
    path: 'dashboard/edit/:id',
    component: DashboardProductEditComponent
  },
  {
    path: 'dashboard/create',
    component: DashboardProductCreateComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'cart/:id',
    component: CartComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

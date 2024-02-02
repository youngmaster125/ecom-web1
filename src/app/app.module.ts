import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { ClientComponent } from './client/client.component';
import { PaymentComponent } from './payment/payment.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CaddiesComponent } from './caddies/caddies.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CategoryComponent,
    OrderComponent,
    ClientComponent,
    PaymentComponent,
    AddProductComponent,
    CaddiesComponent,
    LoginComponent,
    ProductDetailComponent,
    NotAuthorizedComponent,
    NewUserComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,

  ],
  imports: [
    BrowserModule,NgxPrintModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AppHttpInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

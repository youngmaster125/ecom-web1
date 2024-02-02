import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { CaddiesComponent } from './caddies/caddies.component';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NewUserComponent } from './new-user/new-user.component'
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path:"products/:p1/:p2" ,component:ProductsComponent},
  {path:'' , redirectTo:'products/1/0' ,pathMatch:'full'},
  {path:"login" , component:LoginComponent},
  {path:"product-detail/:url" , component:ProductDetailComponent},

  {path:"caddies" , component:CaddiesComponent,},
  {path:"client" , component:ClientComponent,canActivate:[AuthenticationGuard]},
  {path:"order" , component:OrderComponent,canActivate:[AuthenticationGuard]},
  {path:"category" , component:CategoryComponent},
  {path:"payment/:idOrder" , component:PaymentComponent,canActivate:[AuthenticationGuard]},
  {path:"add-products" , component:AddProductComponent,canActivate:[AuthenticationGuard]},
  {path:"notAuthorized" , component:NotAuthorizedComponent},
  {path:"newUser" , component:NewUserComponent},
  {path:"verify/:code" , component:ResetPasswordComponent},
  {path:"verify" , component:ResetPasswordComponent},
  {path:"changePassword" , component:ChangePasswordComponent,canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

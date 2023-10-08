import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login Page' },
  { path: 'register', component: RegisterComponent, title: 'Register Page' },
  { path: 'home', component: HomeComponent, title: 'Home Page', canActivate: [authGuard] },
  { path: 'brands', component: BrandsComponent, title: 'Brands Page', canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, title: 'Products Page', canActivate: [authGuard] },
  { path: 'productDetails/:id', component: ProductDetailsComponent, title: 'Product Details Page', canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, title: 'Categories Page', canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, title: 'Cart Page', canActivate: [authGuard] },
  { path: 'checkout/:cartId', component: CheckoutComponent, title: 'Checkout Page', canActivate: [authGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule), title: 'Settings Page', canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, title: 'Wish List Page', canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent, title: 'Error Page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


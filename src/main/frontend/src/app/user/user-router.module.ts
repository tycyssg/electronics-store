import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import {
  ROUTE_PATH_USER_CART,
  ROUTE_PATH_USER_CHECKOUT,
  ROUTE_PATH_USER_CHECKOUT_COMPLETE,
  ROUTE_PATH_USER_PROFILE
} from '../app-constants';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutCompleteComponent } from './components/checkout-complete/checkout-complete.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATH_USER_PROFILE, pathMatch: 'full'
  },
  {
    path: ROUTE_PATH_USER_PROFILE,
    component: ProfileComponent,
  },
  {
    path: ROUTE_PATH_USER_CART,
    component: CartComponent,
  },
  {
    path: ROUTE_PATH_USER_CHECKOUT,
    component: CheckoutComponent,
  },
  {
    path: ROUTE_PATH_USER_CHECKOUT_COMPLETE,
    component: CheckoutCompleteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {
}

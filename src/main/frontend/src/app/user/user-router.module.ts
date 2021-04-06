import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ROUTE_PATH_USER_CART, ROUTE_PATH_USER_PROFILE } from '../app-constants';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {
}

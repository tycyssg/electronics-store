import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ROUTE_PATH_DISPLAY_PRODUCTS } from '../app-constants';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { ViewProductComponent } from './components/view-product/view-product.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: ROUTE_PATH_DISPLAY_PRODUCTS,
    component: DisplayProductsComponent,
  },
  {
    path: ROUTE_PATH_DISPLAY_PRODUCTS + '/:productId',
    component: ViewProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}

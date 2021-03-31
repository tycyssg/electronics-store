import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CpanelLandingComponent } from './components/cpanel-landing/cpanel-landing.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ROUTE_PATH_CP_EDIT_PRODUCT } from '../app-constants';

const routes: Routes = [
  {
    path: '',
    component: CpanelLandingComponent
  },
  {
    path: ROUTE_PATH_CP_EDIT_PRODUCT + ':productId',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpanelRouterModule {
}

import { NgModule } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';
import { CoreRoutingModule } from './core-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatTabsModule } from '@angular/material/tabs';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { ProductFilter } from './pipe/ProductFilter';
import { DisplaySaleProductsComponent } from './components/display-sale-products/display-sale-products.component';


@NgModule({
  declarations: [LandingComponent, DisplayProductsComponent, ViewProductComponent, AddCommentComponent, ProductFilter, DisplaySaleProductsComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FontAwesomeModule,
    BarRatingModule,
    NgImageSliderModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule
  ],
  providers: []
})
export class CoreModule {
}

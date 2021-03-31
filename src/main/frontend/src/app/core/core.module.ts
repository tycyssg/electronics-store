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


@NgModule({
  declarations: [LandingComponent, DisplayProductsComponent, ViewProductComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FontAwesomeModule,
    BarRatingModule,
    NgImageSliderModule,
    MatTabsModule
  ],
  providers: []
})
export class CoreModule {
}

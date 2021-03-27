import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpanelLandingComponent } from './components/cpanel-landing/cpanel-landing.component';
import { CpanelRouterModule } from './cpanel-router.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateProductComponent } from './components/create-product/create-product.component';


@NgModule({
  declarations: [CpanelLandingComponent, CreateProductComponent],
  imports: [
    CommonModule,
    CpanelRouterModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectModule,
    MatInputModule,
    MatInputModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatProgressBarModule
  ],
  providers: []
})
export class CpanelModule {
}

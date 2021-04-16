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
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatIconModule } from '@angular/material/icon';


export const DateFormats = {
  parse: {
    dateInput: ['MM/DD/YYYY']
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [CpanelLandingComponent, CreateProductComponent, EditProductComponent],
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
    MatProgressBarModule,
    MatTableModule,
    MatExpansionModule,
    MatDatepickerModule,
    NgImageSliderModule,
    MatIconModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DateFormats}
  ]
})
export class CpanelModule {
}

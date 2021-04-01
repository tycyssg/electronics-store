import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertsComponent } from './utilities/alerts/alerts.component';
import { CustomAlertComponent } from './utilities/custom-alert/custom-alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SpinnerComponent } from './utilities/spinner/spiner.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { MdePopoverModule } from '@material-extended/mde';
import { NotificationErrorComponent } from './components/notification-error/notification-error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SortFilterComponent } from './utilities/sort-filter/sort-filter.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AlertsComponent,
    CustomAlertComponent,
    SpinnerComponent,
    LoaderComponent,
    ErrorComponent,
    NotFoundComponent,
    MenuComponent,
    NotificationErrorComponent,
    SortFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
    MatIconModule,
    MatExpansionModule,
    MdePopoverModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    LoaderComponent,
    MenuComponent,
    NotificationErrorComponent,
    CustomAlertComponent,
    SortFilterComponent
  ]
})
export class SharedModule {

}

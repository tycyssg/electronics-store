import { NgModule } from '@angular/core';
import { LandingComponent } from './components/landing/landing.component';
import { CoreRoutingModule } from './core-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FontAwesomeModule,
  ],
  providers: []
})
export class CoreModule {
}

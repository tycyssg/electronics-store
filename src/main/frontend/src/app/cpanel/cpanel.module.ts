import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpanelLandingComponent } from './components/cpanel-landing/cpanel-landing.component';
import { CpanelRouterModule } from './cpanel-router.module';


@NgModule({
  declarations: [CpanelLandingComponent],
  imports: [
    CommonModule,
    CpanelRouterModule
  ],
  providers: []
})
export class CpanelModule {
}

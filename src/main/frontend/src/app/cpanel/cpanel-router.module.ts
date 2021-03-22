import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CpanelLandingComponent } from './components/cpanel-landing/cpanel-landing.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Authorities } from '../auth/model/Authorities';

const routes: Routes = [
  {
    path: '',
    component: CpanelLandingComponent,
    canActivate: [AuthGuard],
    data: {authorities: [Authorities.USER_A]},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpanelRouterModule {
}

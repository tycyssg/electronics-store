import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRouterModule } from './user-router.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    UserRouterModule
  ],
  providers: []
})
export class UserModule {
}

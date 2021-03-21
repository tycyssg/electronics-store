import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  ROUTE_PATH_DEFAULT,
  ROUTE_PATH_ERROR,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_LOGIN_REDIRECT,
  ROUTE_PATH_NOT_FOUND,
  ROUTE_PATH_UNKNOWN
} from './app-constants';
import { ErrorComponent } from './shared/components/error/error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: ROUTE_PATH_DEFAULT, redirectTo: ROUTE_PATH_LOGIN_REDIRECT, pathMatch: 'full'},
  {
    path: ROUTE_PATH_LOGIN,
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: ROUTE_PATH_LOGIN_REDIRECT,
    loadChildren: () => import('./core/core.module').then((module) => module.CoreModule),
  },
  {
    path: ROUTE_PATH_ERROR,
    component: ErrorComponent,
  },
  {
    path: ROUTE_PATH_NOT_FOUND,
    component: NotFoundComponent,
  },
  {
    path: ROUTE_PATH_UNKNOWN,
    redirectTo: ROUTE_PATH_NOT_FOUND
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

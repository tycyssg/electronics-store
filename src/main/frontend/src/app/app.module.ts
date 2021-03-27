import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { SharedModule } from './shared/shared.module';
import { NotifierModule } from 'angular-notifier';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { NOTIFIER_OPTIONS } from './shared/utilities/notifier/notifier.options';
import { Action, ActionReducer, StoreModule } from '@ngrx/store';
import { State } from './store/model/root.state';
import { sessionStorageMetaReducer } from './store/reducer/sessionStorage.meta-reducer';
import { AppState } from './store/model/appState';
import { NGRX_STATE_CPANEL_APP, NGRX_STATE_FEATURE_APP, NGRX_STATE_FEATURE_AUTH } from './app-constants';
import { loaderReducer } from './shared/state/reducers/loader.reducer';
import { errorHandlerReducer } from './shared/state/reducers/errorHandler.reducer';
import { AuthState } from './auth/store/state/auth-state';
import { getAuthenticatedUserReducer } from './auth/store/reducers/auth.reducer';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/effects/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddressEffects } from './auth/store/effects/address.effects';
import { PaymentEffects } from './auth/store/effects/payment.effects';
import { CpanelState } from './cpanel/store/models/cpanel-state';
import { categoryReducer } from './cpanel/store/reducers/cpanel.reducer';
import { CategoryEffects } from './cpanel/store/effects/category.effects';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NotifierModule.withConfig(NOTIFIER_OPTIONS),
    StoreModule.forRoot<State, Action>({
        app: null as any,
        router: null as any,
      },
      {metaReducers: [sessionStorageMetaReducer]}
    ),
    StoreModule.forFeature<ActionReducer<AppState, Action>, Action>(
      NGRX_STATE_FEATURE_APP,
      {
        loader: loaderReducer,
        errorHandler: errorHandlerReducer
      }
    ),
    StoreModule.forFeature<ActionReducer<AuthState, Action>, Action>(
      NGRX_STATE_FEATURE_AUTH,
      {
        authUser: getAuthenticatedUserReducer
      }
    ),
    StoreModule.forFeature<ActionReducer<CpanelState, Action>, Action>(
      NGRX_STATE_CPANEL_APP,
      {
        categories: categoryReducer
      }
    ),
    StoreRouterConnectingModule.forRoot({navigationActionTiming: NavigationActionTiming.PostActivation}),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    EffectsModule.forRoot([AuthEffects, AddressEffects, PaymentEffects, CategoryEffects]),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { AppState } from '../../store/model/appState';
import { LoaderAction } from '../state/actions/loader.action';
import { HttpErrorHandlerService } from '../services/http-error-handler/http-error-handler.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private readonly requests: Array<HttpRequest<any>> = [];

  constructor(private readonly store: Store<AppState>, private readonly httpErrorHandler: HttpErrorHandlerService) {
  }

  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    this.store.dispatch(LoaderAction({isLoading: this.requests.length > 0}));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.store.dispatch(LoaderAction({isLoading: true}));

    return new Observable((observer: Observer<HttpResponse<any>>) => {
      const subscription = next.handle(req).subscribe((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.removeRequest(req);
          observer.next(event);
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === 504 && err.error.reason !== 'GATEWAY TIMEOUT') {
          this.httpErrorHandler.gateAwayTimeoutError();
        }
        if (err.status === 404) {
          this.httpErrorHandler.endpointNotFound();
        } else {
          this.httpErrorHandler.handleError(err);
        }

        this.removeRequest(req);
        observer.error(err);
      }, () => {
        this.removeRequest(req);
        observer.complete();
      });

      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });

  }
}

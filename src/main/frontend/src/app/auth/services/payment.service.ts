import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEADERS_FOR_POST, } from '../../app-constants';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/state/auth-state';
import { PaymentDetails } from '../model/PaymentDetails';

@Injectable({providedIn: 'root'})
export class PaymentService {

  private readonly urls = {
    addPayment: '/api/addPayment',
    makeDefaultPayment: '/api/makeDefaultPayment',
    deletePayment: '/api/deletePayment'
  };

  constructor(private readonly httpClient: HttpClient, private readonly store: Store<AuthState>) {
  }

  public addPayment(payment: PaymentDetails): Observable<PaymentDetails> {
    return this.httpClient.post<PaymentDetails>(this.urls.addPayment, payment, {headers: HEADERS_FOR_POST});
  }


  public makeDefaultPayment(paymentId: string, userId: string): Observable<number> {
    const url = `${this.urls.makeDefaultPayment}/${paymentId}/${userId}`;

    return this.httpClient.get<number>(url);
  }

  public deletePayment(paymentId: string): Observable<number> {
    const url = `${this.urls.deletePayment}/${paymentId}`;

    return this.httpClient.delete<number>(url);
  }

}

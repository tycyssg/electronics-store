import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEADERS_FOR_POST, } from '../../app-constants';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/state/auth-state';
import { Address } from '../model/Address';

@Injectable({providedIn: 'root'})
export class AddressService {

  private readonly urls = {
    addAddress: '/api/addAddress',
    updateAddress: '/api/updateAddress',
    makeBillingAddress: '/api/makeBillingAddress',
    deleteAddress: '/api/deleteAddress'
  };

  constructor(private readonly httpClient: HttpClient, private readonly store: Store<AuthState>) {
  }

  public addAddress(address: Address): Observable<Address> {
    return this.httpClient.post<Address>(this.urls.addAddress, address, {headers: HEADERS_FOR_POST});
  }

  public updateAddress(address: Address): Observable<Address> {
    return this.httpClient.put<Address>(this.urls.updateAddress, address, {headers: HEADERS_FOR_POST});
  }

  public makeBillingAddress(addressId: string, userId: string): Observable<number> {
    const url = `${this.urls.makeBillingAddress}/${addressId}/${userId}`;

    return this.httpClient.get<number>(url);
  }

  public deleteAddress(addressId: string): Observable<number> {
    const url = `${this.urls.deleteAddress}/${addressId}`;

    return this.httpClient.delete<number>(url);
  }

}

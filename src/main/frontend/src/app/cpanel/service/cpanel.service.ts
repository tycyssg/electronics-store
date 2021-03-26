import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductImageModel } from '../model/product-image.model';


@Injectable({providedIn: 'root'})
export class CpanelService {

  private readonly urls = {
    uploadImages: '/api/uploadImages',
    getAllImages: '/api/getAllImages',
  };

  constructor(private readonly httpClient: HttpClient) {
  }


  public uploadImages(f: any, productId: number): Observable<any> {
    const url = `${this.urls.uploadImages}/${productId}`;
    return this.httpClient.post<any>(url, f, {reportProgress: true, observe: 'events'});
  }

  public getAllImages(): Observable<ProductImageModel[]> {
    return this.httpClient.get<ProductImageModel[]>(this.urls.getAllImages);
  }
}

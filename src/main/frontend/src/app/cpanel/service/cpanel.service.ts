import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductImageModel } from '../model/product-image.model';
import { HEADERS_FOR_POST } from '../../app-constants';
import { Category } from '../model/category.model';


@Injectable({providedIn: 'root'})
export class CpanelService {

  private readonly urls = {
    uploadImages: '/api/uploadImages',
    getAllImages: '/api/getAllImages',
    addCategory: '/api/addCategory',
    updateCategory: '/api/updateCategory',
    getAllCategories: '/api/getAllCategories',
    deleteCategory: '/api/deleteCategory',
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

  public addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.urls.addCategory, category, {headers: HEADERS_FOR_POST});
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.urls.updateCategory, category, {headers: HEADERS_FOR_POST});
  }

  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.urls.getAllCategories);
  }

  public deleteCategory(categoryId: number): Observable<number> {
    const url = `${this.urls.deleteCategory}/${categoryId}`;
    return this.httpClient.delete<number>(url);
  }

}

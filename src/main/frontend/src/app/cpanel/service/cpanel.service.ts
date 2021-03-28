import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductImageModel } from '../model/product-image.model';
import { HEADERS_FOR_POST } from '../../app-constants';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { ProductComments } from '../model/product-comments.model';
import { UpdatedStock } from '../model/updated-stock.model';


@Injectable({providedIn: 'root'})
export class CpanelService {

  private readonly urls = {
    uploadImages: '/api/uploadImages',
    getAllImages: '/api/getAllImages',
    addCategory: '/api/addCategory',
    updateCategory: '/api/updateCategory',
    getAllCategories: '/api/getAllCategories',
    deleteCategory: '/api/deleteCategory',
    addProduct: '/api/addProduct',
    updateProduct: '/api/updateProduct',
    deleteProduct: '/api/deleteProduct',
    updateProductStock: '/api/updateProductStock',
    updateRating: '/api/updateRating',
    addProductComment: '/api/addProductComment',
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

  public addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.urls.addProduct, product, {headers: HEADERS_FOR_POST});
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.urls.updateProduct, product, {headers: HEADERS_FOR_POST});
  }

  public deleteProduct(productId: number): Observable<number> {
    const url = `${this.urls.deleteProduct}/${productId}`;
    return this.httpClient.delete<number>(url);
  }

  public updateProductStock(updateStock: UpdatedStock): Observable<Product> {
    const url = `${this.urls.updateProductStock}/${updateStock.productId}`;
    let body = new HttpParams();
    body = body.set('stock', updateStock.stock + '');
    return this.httpClient.put<Product>(url, null, {headers: HEADERS_FOR_POST, params: body});
  }

  public updateRating(customerRating: number, productId: number): Observable<Product> {
    const url = `${this.urls.updateRating}/${productId}`;
    let body = new HttpParams();
    body = body.set('customerRating', customerRating + '');
    return this.httpClient.put<Product>(url, body, {headers: HEADERS_FOR_POST});
  }

  public addProductComment(comment: ProductComments): Observable<ProductComments> {
    return this.httpClient.post<ProductComments>(this.urls.addProductComment, comment, {headers: HEADERS_FOR_POST});
  }
}

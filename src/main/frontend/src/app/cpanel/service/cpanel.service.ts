import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HEADERS_FOR_POST } from '../../app-constants';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { ProductComments } from '../model/product-comments.model';
import { UpdatedStock } from '../model/updated-stock.model';
import { UpdatedRating } from '../model/updated-rating.model';
import { CartItems } from '../../auth/model/CartItems';


@Injectable({providedIn: 'root'})
export class CpanelService {

  private readonly urls = {
    uploadImages: '/api/uploadImages',
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

  public updateRating(updatedRating: UpdatedRating): Observable<Product> {
    const url = `${this.urls.updateRating}/${updatedRating.productId}`;
    let body = new HttpParams();
    body = body.set('customerRating', updatedRating.totalRating + '');
    return this.httpClient.put<Product>(url, null, {headers: HEADERS_FOR_POST, params: body});
  }

  public addProductComment(comment: ProductComments): Observable<ProductComments> {
    return this.httpClient.post<ProductComments>(this.urls.addProductComment, comment, {headers: HEADERS_FOR_POST});
  }

  public discountExpired(date: Date | undefined): boolean {
    if (!date) return false;
    return new Date(date).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0);
  }

  public calculateTotal(cartItems: CartItems[], products: Map<number, Product>): number {
    let cartTotal = 0;

    if (!cartItems || !products) return 0;

    cartItems.forEach(c => {
      const isDiscounted = this.discountExpired(products.get(c.productId).expireDiscount);

      if (isDiscounted) {
        cartTotal += ((products.get(c.productId).price - (products.get(c.productId).price * products.get(c.productId).discountAmount) / 100) * c.productQuantity);
      } else {
        cartTotal += (products.get(c.productId).price * c.productQuantity)
      }
    })
    return cartTotal
  }
}

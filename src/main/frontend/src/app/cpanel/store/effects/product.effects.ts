import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as ProductAction from '../../../cpanel/store/actions/products.actions';
import { map, switchMap } from 'rxjs/operators';
import {
  NOTIFICATION_TYPES,
  PRODUCT_ADDED,
  PRODUCT_DELETED,
  PRODUCT_RATED_UPDATED,
  PRODUCT_REVIEW_ADD,
  PRODUCT_STOCK_UPDATED,
  PRODUCT_UPDATED,
} from '../../../app-constants';
import { CpanelService } from '../../service/cpanel.service';
import { Product } from '../../model/product.model';
import { UpdatedStock } from '../../model/updated-stock.model';
import { UpdatedRating } from '../../model/updated-rating.model';
import { ProductComments } from '../../model/product-comments.model';


@Injectable()
export class ProductEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public addProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestAddProduct),
    switchMap((product: any) => this.cpanelService.addProduct(product)),
    map((product: Product) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, PRODUCT_ADDED);
      return ProductAction.AddProductAction(product);
    })
  ));

  public updateProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestUpdateProduct),
    switchMap((product: any) => this.cpanelService.updateProduct(product)),
    map((product: Product) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, PRODUCT_UPDATED);
      return ProductAction.UpdateProductAction(product);
    })
  ));

  public updateProductStock$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestUpdateProductStock),
    switchMap((stock: any) => this.cpanelService.updateProductStock(stock)),
    map((stock: UpdatedStock) => {
      this.notifier.notify(NOTIFICATION_TYPES.info, PRODUCT_STOCK_UPDATED);
      return ProductAction.UpdateProductStockAction(stock);
    })
  ));

  public simulateBuy$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestSimulateBuy),
    switchMap((stock: any) => this.cpanelService.simulateBuy(stock)),
    map((stock: UpdatedStock) => {
      this.notifier.notify(NOTIFICATION_TYPES.info, PRODUCT_STOCK_UPDATED);
      return ProductAction.SimulateBuyAction(stock);
    })
  ));


  public updateProductRating$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestAddProductRating),
    switchMap((rating: any) => this.cpanelService.updateRating(rating)),
    map((rating: UpdatedRating) => {
      this.notifier.notify(NOTIFICATION_TYPES.info, PRODUCT_RATED_UPDATED);
      return ProductAction.AddProductRatingAction(rating);
    })
  ));

  public addProductComment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestAddProductComment),
    switchMap((comment: any) => this.cpanelService.addProductComment(comment)),
    map((comment: ProductComments) => {
      this.notifier.notify(NOTIFICATION_TYPES.info, PRODUCT_REVIEW_ADD);
      return ProductAction.AddProductCommentAction(comment);
    })
  ));

  public deleteProduct$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(ProductAction.ProductTypes.requestDeleteProduct),
    switchMap((payload: any) => this.cpanelService.deleteProduct(payload.id)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.error, PRODUCT_DELETED);
      return ProductAction.DeleteProductAction({id: id});
    })
  ));


  constructor(private readonly actions$: Actions, private readonly cpanelService: CpanelService, private readonly notifier: NotifierService) {
  }

}

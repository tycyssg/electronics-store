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
  PRODUCT_STOCK_UPDATED,
  PRODUCT_UPDATED,
} from '../../../app-constants';
import { CpanelService } from '../../service/cpanel.service';
import { Product } from '../../model/product.model';
import { UpdatedStock } from '../../model/updated-stock.model';


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

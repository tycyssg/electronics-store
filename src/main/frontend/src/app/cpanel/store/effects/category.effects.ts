import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as CategoryAction from '../../../cpanel/store/actions/categories.actions';
import { map, switchMap } from 'rxjs/operators';
import { CATEGORY_ADDED, CATEGORY_DELETED, CATEGORY_UPDATED, NOTIFICATION_TYPES, } from '../../../app-constants';
import { CpanelService } from '../../service/cpanel.service';
import { Category } from '../../model/category.model';


@Injectable()
export class CategoryEffects {

  /**
   * Use catchError inside SwitchMap to keep flow working
   */

  public addCategory$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CategoryAction.CategoryTypes.requestAddCategory),
    switchMap((category: any) => this.cpanelService.addCategory(category)),
    map((category: Category) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, CATEGORY_ADDED);
      return CategoryAction.AddCategoryAction(category)
    })
  ));

  public updateCategory$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CategoryAction.CategoryTypes.requestUpdateCategory),
    switchMap((category: any) => this.cpanelService.updateCategory(category)),
    map((category: Category) => {
      this.notifier.notify(NOTIFICATION_TYPES.success, CATEGORY_UPDATED);
      return CategoryAction.UpdateCategoryAction(category)
    })
  ));

  public getCategories$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CategoryAction.CategoryTypes.requestGetCategories),
    switchMap(() => this.cpanelService.getAllCategories()),
    map((categories: Category[]) => {
      return CategoryAction.GetCategoriesAction({categories: categories})
    })
  ));

  public deleteCategory$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(CategoryAction.CategoryTypes.requestDeleteCategory),
    switchMap((payload: any) => this.cpanelService.deleteCategory(payload.id)),
    map((id: number) => {
      this.notifier.notify(NOTIFICATION_TYPES.error, CATEGORY_DELETED);
      return CategoryAction.DeleteCategoryAction({id: id})
    })
  ));


  constructor(private readonly actions$: Actions, private readonly cpanelService: CpanelService, private readonly notifier: NotifierService) {
  }

}

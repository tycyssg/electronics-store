import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  RequestAddCategoryAction,
  RequestDeleteCategoryAction,
  RequestUpdateCategoryAction
} from '../../store/actions/categories.actions';
import { Category } from '../../model/category.model';
import { getCategoriesSelector } from '../../store/selectors/cpanel.selector';
import { DEFAULT_CONFIRM_MESSAGE } from '../../../app-constants';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatSelectChange } from '@angular/material/select';
import { Product } from '../../model/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { RequestDeleteProductAction, RequestUpdateProductStockAction } from '../../store/actions/products.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cpanel-landing',
  templateUrl: './cpanel-landing.component.html',
  styleUrls: ['./cpanel-landing.component.scss']
})
export class CpanelLandingComponent implements OnInit, OnDestroy {

  public categoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(null),
    categoryName: new FormControl(null, Validators.required),
  });

  public categoryList: Category[] = [];
  private categoryEdit: boolean = false;
  public displayedColumns: string[] = ['position', 'friendly', 'manufactured', 'stock', 'price', 'goTo', 'delete'];
  public dataSource: any;
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<State>, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.categoryList = payload.categories;
      let products = [];
      this.categoryList.forEach(c => products = [...products, ...c.products])
      this.dataSource = new MatTableDataSource(products);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onAddCategory() {
    if (this.categoryEdit) {
      this.store.dispatch(RequestUpdateCategoryAction(this.categoryForm.value));
    } else {
      this.store.dispatch(RequestAddCategoryAction(this.categoryForm.value));
    }
    this.categoryEdit = false;
    this.categoryForm.reset();
  }

  public onEditCategory(category: Category) {
    this.categoryEdit = true;
    this.categoryForm.patchValue(category);
  }

  public onDeleteCategory(categoryId: number) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || categoryId == null) return;

    this.store.dispatch(RequestDeleteCategoryAction({id: categoryId}));
  }

  public addProduct() {
    this.dialog.open(CreateProductComponent, {width: '650px', disableClose: true});
  }

  public filterByCategory(event: MatSelectChange) {
    let products: Product[] = [];
    this.categoryList.forEach(c => products = [...products, ...c.products])

    if (event.value == 0) {
      this.dataSource = new MatTableDataSource(products);
      return;
    }

    const filteredValue = products.slice().filter(p => p.categoryId == event.value);
    this.dataSource = new MatTableDataSource(filteredValue);
  }

  public onDeleteProduct(productId: number) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || productId == null) return;

    this.store.dispatch(RequestDeleteProductAction({id: productId}));
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public changeStock(event: any, productId: number) {
    const stockValue = event.value;
    if (stockValue < 0) return;

    this.store.dispatch(RequestUpdateProductStockAction({productId: productId, stock: stockValue}))
  }
}

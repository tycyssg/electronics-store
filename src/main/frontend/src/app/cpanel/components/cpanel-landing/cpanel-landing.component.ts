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
import { getCategoriesSelector, getCouponsSelector, getUsersSelector } from '../../store/selectors/cpanel.selector';
import { DEFAULT_CONFIRM_MESSAGE } from '../../../app-constants';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatSelectChange } from '@angular/material/select';
import { Product } from '../../model/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { RequestDeleteProductAction, RequestUpdateProductStockAction } from '../../store/actions/products.actions';
import { Subscription } from 'rxjs';
import { RequestGetUsersAction } from '../../store/actions/users.actions';
import { User } from '../../../auth/model/User';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderDetails } from '../../../auth/model/OrderDetails';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import {
  RequestAddCouponAction,
  RequestDeleteCouponAction,
  RequestGetCouponsAction
} from '../../store/actions/coupon.actions';
import { CouponModel } from '../../model/coupon.model';

@Component({
  selector: 'app-cpanel-landing',
  templateUrl: './cpanel-landing.component.html',
  styleUrls: ['./cpanel-landing.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CpanelLandingComponent implements OnInit, OnDestroy {

  public categoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(null),
    categoryName: new FormControl(null, Validators.required),
  });

  public couponsForm: FormGroup = new FormGroup({
    couponId: new FormControl(null),
    couponCode: new FormControl(null, Validators.required),
    discountPercentage: new FormControl(null, Validators.required),
    validTime: new FormControl(null, Validators.required),
  });

  public categoryList: Category[] = [];
  public couponsList: CouponModel[] = [];
  private categoryEdit: boolean = false;
  public displayedColumns: string[] = ['position', 'friendly', 'manufactured', 'stock', 'price', 'goTo', 'delete'];
  public userDisplayedColumns: string[] = ['username', 'email', 'phone', 'joinDate', 'lastLoginDate'];
  public dataSource: any;
  public userDataSource = new MatTableDataSource<User>([]);
  public expandedElement: OrderDetails | undefined;
  public productsAsMap: Map<number, Product> = new Map<number, Product>();
  private subs: Array<Subscription> = [];

  constructor(private readonly store: Store<State>, private readonly dialog: MatDialog) {
  }

  private static _generateCoupon(): string {
    let text = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 15; i++)
      text += letters.charAt(Math.floor(Math.random() * letters.length));

    return text;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private _loadCategories() {
    this.subs.push(this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.categoryList = payload.categories;
      let products = [];
      this.productsAsMap = new Map<number, Product>();
      this.categoryList.forEach(c => {
        c.products.forEach(p => {
          this.productsAsMap.set(p.productId, p);
          products.push(p);
        });
      });
      this.dataSource = new MatTableDataSource(products);
    }));
  }

  private _loadUsers() {
    this.store.dispatch(RequestGetUsersAction());
    this.subs.push(this.store.pipe(select(getUsersSelector)).subscribe(payload => {
      this.userDataSource = new MatTableDataSource(payload.users);
    }));
  }

  ngOnInit(): void {
    this._loadCategories();
    this._loadUsers();
    this._loadCoupons();
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

  public onGenerateCouponCode() {
    this.couponsForm.get('couponCode').setValue(CpanelLandingComponent._generateCoupon());
  }

  public onSelectedDate(event: MatDatepickerInputEvent<any, any>) {
    const formatDate = _moment(event.value).format('MM/DD/YYYY');
    this.couponsForm.get('validTime').setValue(new Date(formatDate));
  }

  public onAddCoupon() {
    this.store.dispatch(RequestAddCouponAction(this.couponsForm.value));
  }

  public onDeleteCoupon(couponId: number) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || couponId == null) return;

    this.store.dispatch(RequestDeleteCouponAction({id: couponId}));
  }

  private _loadCoupons() {
    this.store.dispatch(RequestGetCouponsAction());
    this.subs.push(this.store.pipe(select(getCouponsSelector)).subscribe(payload => {
      this.couponsList = payload.coupons;
    }));
  }
}

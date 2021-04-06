import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../cpanel/model/product.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { ActivatedRoute, Router } from '@angular/router';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { Category } from '../../../cpanel/model/category.model';
import { ProductImageModel } from '../../../cpanel/model/product-image.model';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { User } from '../../../auth/model/User';
import { CpanelService } from '../../../cpanel/service/cpanel.service';
import { RequestAddProductRatingAction } from '../../../cpanel/store/actions/products.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { Subscription } from 'rxjs';
import { RequestAddCartItemAction } from '../../../auth/store/actions/cart.actions';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit, OnDestroy {
  public currentProduct: Product | undefined = undefined;
  public categoryList: Category[] = [];
  public imageObject: Array<object> = [];
  public currentUser: User | undefined = undefined;
  public categoryAsMap: Map<number, string> = new Map<number, string>();
  private subs: Array<Subscription> = [];

  constructor(private readonly store: Store<State>, private readonly route: ActivatedRoute, private readonly router: Router, public cpanelService: CpanelService, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._loadCategories();
    this._loadUser();
  }

  public onRatingChange(event: number) {
    if (this.currentProduct == undefined || isNaN(event)) return;

    this.store.dispatch(RequestAddProductRatingAction({totalRating: event, productId: this.currentProduct.productId}));
  }

  public sanitizeImage(image: any): any {
    return 'data:image/jpeg;base64,' + image;
  }

  public prepareImageToDisplay(images: ProductImageModel[]) {
    this.imageObject = [];

    if (images.length == 0) {
      this.imageObject.push({
        image: 'assets/images/nophoto.png',
        thumbImage: 'assets/images/nophoto.png',
        title: 'No Photo',
        alt: 'No Photo'
      });
      return;
    }

    images.forEach(i => this.imageObject.push({
      image: this.sanitizeImage(i.image),
      thumbImage: this.sanitizeImage(i.image),
      title: i.name,
      alt: i.name
    }));
  }

  public onAddComment() {
    this.dialog.open(AddCommentComponent, {
      width: '650px',
      disableClose: true,
      data: {productId: this.currentProduct.productId}
    });
  }

  private _getParamFromRoute() {
    this.route.params.subscribe(p => {
      const pId = p['productId']
      const categoryIndex = this.categoryList.findIndex(c => c.products?.some(p => p.productId == pId));

      if (categoryIndex == -1) {
        this.router.navigate(['/404']);
        return;
      }

      this.currentProduct = this.categoryList[categoryIndex].products.find(p => p.productId == pId);
      this.prepareImageToDisplay(this.currentProduct.images);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private _loadUser() {
    this.subs.push(this.store.pipe(select(getAuthSelector)).subscribe(payload => this.currentUser = payload.authUser));
  }

  private _loadCategories() {
    this.subs.push(this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.categoryList = payload.categories;
      this.categoryAsMap = new Map<number, string>();
      this.categoryList.forEach(c => this.categoryAsMap.set(c.categoryId, c.categoryName));
      this._getParamFromRoute();
    }));
  }

  public addProductToCart(productId: number) {
    this.store.dispatch(RequestAddCartItemAction({
      cartItemId: null,
      productQuantity: null,
      productId: productId,
      userId: this.currentUser.userId
    }))
  }
}

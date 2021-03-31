import { Component, OnInit } from '@angular/core';
import { Product } from '../../../cpanel/model/product.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { ActivatedRoute, Router } from '@angular/router';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { Category } from '../../../cpanel/model/category.model';
import { ProductImageModel } from '../../../cpanel/model/product-image.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  public currentProduct: Product | undefined = undefined;
  public categoryList: Category[] = [];
  public imageObject: Array<object> = [];

  constructor(private readonly store: Store<State>, private readonly route: ActivatedRoute, private readonly router: Router) {
  }

  ngOnInit(): void {
    this._loadCategories();
  }

  public sanitizeImage(image: any): any {
    return 'data:image/jpeg;base64,' + image;
  }

  public prepareImageToDisplay(images: ProductImageModel[]) {
    if (!images) return;
    this.imageObject = [];
    images.forEach(i => this.imageObject.push({
      image: this.sanitizeImage(i.image),
      thumbImage: this.sanitizeImage(i.image),
      title: i.name,
      alt: i.name
    }));
  }

  private _loadCategories() {
    this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.categoryList = payload.categories;
      this._getParamFromRoute();
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

}

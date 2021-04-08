import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { State } from '../../../store/model/root.state';
import { Product } from '../../../cpanel/model/product.model';
import { CpanelService } from '../../../cpanel/service/cpanel.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../../cpanel/model/category.model';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit, OnDestroy {
  public productsList: Product[] = []
  public productsListClone: Product[] = []
  public categoryList: Category[] = [];
  public filterControl: FormControl = new FormControl(null);
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<State>, public cpanelService: CpanelService) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsList = [];
      this.productsListClone = []
      this.categoryList = payload.categories;
      payload.categories.forEach(c => this.productsList = [...this.productsList, ...c.products])
      this.productsListClone = this.productsList.slice();
    });
  }

  public filterByCategory(event: MatSelectChange) {
    this.productsList = this.productsListClone;

    if (event.value == 0) {
      this.productsList = this.productsListClone;
      return;
    }

    this.productsList = this.productsList.slice().filter(p => p.categoryId == event.value);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

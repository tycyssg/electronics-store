import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../cpanel/model/product.model';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { CpanelService } from '../../../cpanel/service/cpanel.service';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-sale-products',
  templateUrl: './display-sale-products.component.html',
  styleUrls: ['./display-sale-products.component.scss']
})
export class DisplaySaleProductsComponent implements OnInit, OnDestroy {
  public productsList: Product[] = []
  public filterControl: FormControl = new FormControl(null);
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<State>, public cpanelService: CpanelService) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsList = [];
      payload.categories.forEach(c => {
        c.products.forEach(p => {
          if (this.cpanelService.discountExpired(p.expireDiscount)) {
            this.productsList.push(p);
          }
        })
      })
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

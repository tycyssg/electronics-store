import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { State } from '../../../store/model/root.state';
import { Product } from '../../../cpanel/model/product.model';
import { CpanelService } from '../../../cpanel/service/cpanel.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit, OnDestroy {
  public productsList: Product[] = []
  public filterControl: FormControl = new FormControl(null);
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<State>, public cpanelService: CpanelService) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsList = [];
      payload.categories.forEach(c => this.productsList = [...this.productsList, ...c.products])
    });
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

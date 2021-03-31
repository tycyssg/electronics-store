import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';
import { State } from '../../../store/model/root.state';
import { Product } from '../../../cpanel/model/product.model';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {
  public rate = 3.8;
  public productsList: Product[] = []

  constructor(private readonly store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsList = [];
      payload.categories.forEach(c => this.productsList = [...this.productsList, ...c.products])
    });
  }

}

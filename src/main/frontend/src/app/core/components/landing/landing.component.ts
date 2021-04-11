import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { RequestGetCategoriesAction } from '../../../cpanel/store/actions/categories.actions';
import { Product } from '../../../cpanel/model/product.model';
import { Subscription } from 'rxjs';
import { getCategoriesSelector } from '../../../cpanel/store/selectors/cpanel.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public productsList: Product[] = []
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<State>) {
    this.subs = this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.productsList = [];
      payload.categories.forEach(c => this.productsList = [...this.productsList, ...c.products])
      this._sortByLatestDate();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(RequestGetCategoriesAction());
  }

  private _sortByLatestDate() {
    this.productsList.sort((a, b) => 0 - (a.dateCreated > b.dateCreated ? 1 : -1));
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../cpanel/model/product.model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss']
})
export class SortFilterComponent implements OnInit {
  @Input() productsList: Product[] = []
  @Output() productsListChange: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  public defaultProductsList: Product[] = []
  public sortControl: FormControl = new FormControl(null);

  constructor() {
  }

  ngOnInit(): void {
    if (this.productsList.length > 0) {
      this.defaultProductsList = this.productsList.slice();
    }

    this._onSortProducts();
  }

  private _onSortProducts() {
    this.sortControl.valueChanges.subscribe(value => {
      if (value == null) return;

      if (value == 'default') {
        this.productsList = this.defaultProductsList;
        this.productsListChange.emit(this.productsList);
        return;
      }

      if (value == 'high-price') {
        this._sortByHighPrice();
        this.productsListChange.emit(this.productsList);
        return;
      }

      if (value == 'low-price') {
        this._sortByLowPrice();
        this.productsListChange.emit(this.productsList);
        return;
      }

      if (value == 'best-rating') {
        this._sortByHighRating();
        this.productsListChange.emit(this.productsList);
        return;
      }

      if (value == 'low-rating') {
        this._sortByLowRating();
        this.productsListChange.emit(this.productsList);
        return;
      }

      if (value == 'ascending-order') {
        this._sortAscending();
        this.productsListChange.emit(this.productsList);
        return;
      }

      if (value == 'descending-order') {
        this._sortDescending();
        this.productsListChange.emit(this.productsList);
        return;
      }

    })
  }

  private _sortByHighPrice() {
    this.productsList.sort((a, b) => 0 - (a.price > b.price ? 1 : -1));
  }

  private _sortByLowPrice() {
    this.productsList.sort((a, b) => 0 - (a.price > b.price ? -1 : 1));
  }

  private _sortByHighRating() {
    this.productsList.sort((a, b) => 0 - ((a.totalRating / a.numOfRatingCustomers) > (b.totalRating / b.numOfRatingCustomers) ? 1 : -1));
  }

  private _sortByLowRating() {
    this.productsList.sort((a, b) => 0 - ((a.totalRating / a.numOfRatingCustomers) > (b.totalRating / b.numOfRatingCustomers) ? -1 : 1));
  }

  private _sortAscending() {
    this.productsList.sort((a, b) => 0 - (a.title > b.title ? -1 : 1));
  }

  private _sortDescending() {
    this.productsList.sort((a, b) => 0 - (a.title > b.title ? 1 : -1));
  }


}

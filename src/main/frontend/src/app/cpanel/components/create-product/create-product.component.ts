import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/category.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { getCategoriesSelector } from '../../store/selectors/cpanel.selector';
import { NavigationStart, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public categoryList: Category[] = [];
  public productForm: FormGroup = new FormGroup({
    productId: new FormControl(null),
    title: new FormControl(null, Validators.required),
    manufactured: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    stock: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required)
  });

  constructor(
    private readonly store: Store<State>,
    private readonly router: Router,
    public readonly dialogRef: MatDialogRef<CreateProductComponent>
  ) {
  }

  ngOnInit(): void {
    this._closeDialogOnNavigate();
    this.store.pipe(select(getCategoriesSelector)).subscribe(payload => this.categoryList = payload.categories);
  }

  public onAddProduct() {

  }


  public onDialogClose() {
    this.dialogRef.close();
  }

  public onClearProductForm() {
    this.productForm.reset();
  }

  private _closeDialogOnNavigate() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationStart),
      tap(() => this.onDialogClose()),
      take(1),
    ).subscribe();
  }
}

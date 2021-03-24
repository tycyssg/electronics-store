import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { NavigationStart, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from '../../../auth/model/Address';
import { filter, take, tap } from 'rxjs/operators';
import { RequestAddAddressAction, RequestUpdateAddressAction } from '../../../auth/store/actions/address.actions';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  public addressForm: FormGroup = new FormGroup({
    addressId: new FormControl(null),
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    address1: new FormControl(null, Validators.required),
    address2: new FormControl(null),
    city: new FormControl(null, Validators.required),
    county: new FormControl(null, Validators.required),
    eirCode: new FormControl(null),
    country: new FormControl(null, Validators.required),
    billingAddress: new FormControl(null),
    userId: new FormControl(null),
  });

  constructor(
    private readonly store: Store<State>,
    private readonly router: Router,
    public readonly dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address?: Address, userId: number }
  ) {
  }

  ngOnInit(): void {
    this._closeDialogOnNavigate();

    if (this.data?.address) {
      this.addressForm.patchValue(this.data.address)
    }

    this.addressForm.get('userId').setValue(this.data.userId);
  }

  public onDialogClose() {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.data?.address) {
      this.store.dispatch(RequestUpdateAddressAction(this.addressForm.value));
    } else {
      this.store.dispatch(RequestAddAddressAction(this.addressForm.value));
    }

    this.addressForm.reset();
    this.onDialogClose();
  }

  private _closeDialogOnNavigate() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationStart),
      tap(() => this.onDialogClose()),
      take(1),
    ).subscribe();
  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Address } from '../../../auth/model/Address';

@Component({
  selector: 'app-checkout-select-address',
  templateUrl: './checkout-select-address.component.html',
  styleUrls: ['./checkout-select-address.component.scss']
})
export class CheckoutSelectAddressComponent implements OnInit {

  constructor(
    public readonly dialogRef: MatDialogRef<CheckoutSelectAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { addresses: Address[] }
  ) {
  }

  ngOnInit(): void {
  }

  public onDialogClose() {
    this.dialogRef.close();
  }
}

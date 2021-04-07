import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentDetails } from '../../../auth/model/PaymentDetails';

@Component({
  selector: 'app-checkout-select-payment',
  templateUrl: './checkout-select-payment.component.html',
  styleUrls: ['./checkout-select-payment.component.scss']
})
export class CheckoutSelectPaymentComponent implements OnInit {

  constructor(
    public readonly dialogRef: MatDialogRef<CheckoutSelectPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payments: PaymentDetails[] }
  ) {
  }

  ngOnInit(): void {
  }

  public onDialogClose() {
    this.dialogRef.close();
  }
}

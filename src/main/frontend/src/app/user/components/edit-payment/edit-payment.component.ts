import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { NavigationStart, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, take, tap } from 'rxjs/operators';
import { RequestAddPaymentAction } from '../../../auth/store/actions/payment.actions';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent implements OnInit {

  public paymentForm: FormGroup = new FormGroup({
    cardNo: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]+$')]),
    expireDate: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.minLength(5), Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]+$')]),
    userId: new FormControl(null)
  });

  constructor(
    private readonly store: Store<State>,
    private readonly router: Router,
    public readonly dialogRef: MatDialogRef<EditPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
  }

  ngOnInit(): void {
    this._closeDialogOnNavigate();
    this.paymentForm.get('userId').setValue(this.data.userId);
  }

  public onDialogClose() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.store.dispatch(RequestAddPaymentAction(this.paymentForm.value));
    this.paymentForm.reset();
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

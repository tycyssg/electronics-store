import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { filter, take, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { RequestAddProductCommentAction } from '../../../cpanel/store/actions/products.actions';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  commentForm: FormGroup = new FormGroup({
    productId: new FormControl(null, Validators.required),
    firstImpression: new FormControl(null, Validators.required),
    commentedBy: new FormControl(null, Validators.required),
    commentContent: new FormControl(null, Validators.required),
  });

  constructor(
    public readonly dialogRef: MatDialogRef<AddCommentComponent>,
    private readonly router: Router,
    private readonly store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }
  ) {
  }

  ngOnInit(): void {
    this._closeDialogOnNavigate();
    this._loadUser();
  }

  public onDialogClose() {
    this.dialogRef.close();
  }

  public onAddComment() {
    if (!this.commentForm.valid) return;

    this.store.dispatch(RequestAddProductCommentAction(this.commentForm.value));
    this.onDialogClose();
  }

  private _loadUser() {
    this.store.pipe(select(getAuthSelector)).subscribe(payload => {
      this.commentForm.get('commentedBy').setValue(payload.authUser.username);
      this.commentForm.get('productId').setValue(this.data.productId);
    });
  }

  private _closeDialogOnNavigate() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationStart),
      tap(() => this.onDialogClose()),
      take(1),
    ).subscribe();
  }


}

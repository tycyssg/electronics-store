import { Component, OnDestroy, OnInit } from '@angular/core';
import { errorHandlerSelector } from '../../state/selectors/shared.selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/model/appState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-error',
  templateUrl: './notification-error.component.html',
  styleUrls: ['./notification-error.component.scss']
})
export class NotificationErrorComponent implements OnInit, OnDestroy {

  public showError: boolean = false;
  public errorMessage: string = '';
  public strongTitle: string = '';
  public allowToClose: boolean = false;
  private subs: Subscription = undefined;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subs = this.store.pipe(select(errorHandlerSelector)).subscribe(response => {
      this.showError = response.showError;
      this.errorMessage = response.errorMessage;
      this.strongTitle = response.strongTitle as any;
      this.allowToClose = response.allowToClose as any;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

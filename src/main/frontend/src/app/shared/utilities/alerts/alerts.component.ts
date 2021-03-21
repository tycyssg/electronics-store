import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../../store/model/appState';
import { Store } from '@ngrx/store';
import { ErrorHandlerAction } from '../../state/actions/error-handler.action';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  @Input() alertType: string = '';
  @Input() alertWidth: string = '';
  @Input() alertHeight: string = '';
  @Input() showAlert: boolean = false;
  @Input() alertText: string = '';
  @Input() strongText: string = '';
  @Input() rounded: boolean = false;
  @Input() showCloseButton: boolean = false;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  public hideErrorScreen(): void {
    this.store.dispatch(ErrorHandlerAction({showError: false, errorMessage: '', allowToClose: true}));
  }
}

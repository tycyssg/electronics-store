import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/model/appState';
import { errorHandlerSelector } from '../../state/selectors/shared.selectors';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public errorMessage = '';
  public strongTitle: string = '';

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(errorHandlerSelector)).subscribe(response => {
      this.errorMessage = response.errorMessage || '';
      this.strongTitle = response.strongTitle || '';
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/model/appState';
import { getIsLoadingSelector } from '../../state/selectors/shared.selectors';
import { LoaderAction } from '../../state/actions/loader.action';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() public appLoader: boolean | undefined;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(LoaderAction({isLoading: false}));
    this.store.pipe(select(getIsLoadingSelector)).subscribe(response => {
      this.appLoader = response.isLoading;
    });
  }

}

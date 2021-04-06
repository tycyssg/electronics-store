import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { RequestGetCategoriesAction } from '../../../cpanel/store/actions/categories.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  constructor(private readonly store: Store<State>) {

  }

  ngOnInit(): void {
    this.store.dispatch(RequestGetCategoriesAction());
  }
}

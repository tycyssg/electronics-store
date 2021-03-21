import { Component, OnInit } from '@angular/core';
import { ROUTE_PATH_PROJECTS } from '../../../app-constants';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public projectPath: string = '/' + ROUTE_PATH_PROJECTS;

  constructor(private readonly store: Store<State>) {
  }

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {


  constructor(private readonly store: Store<State>) {

  }

  ngOnInit(): void {
    console.log('ddwdwddd')
  }
}

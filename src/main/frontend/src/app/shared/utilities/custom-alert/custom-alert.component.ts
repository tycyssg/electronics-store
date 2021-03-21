import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.scss']
})
export class CustomAlertComponent implements OnInit {

  @Input() alertType: string = '';
  @Input() alertText: string = '';
  @Input() alertIcon?: any;
  @Input() strongText: string = '';
  @Input() rounded: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}

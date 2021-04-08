import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {
  private subs: Subscription;

  constructor(private readonly router: Router) {
    this.subs = router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.id == 1) {
          this.router.navigate(['/'])
        }
      });
  }

  ngOnInit(): void {
  }

}

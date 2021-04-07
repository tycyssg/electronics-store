import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSelectPaymentComponent } from './checkout-select-payment.component';

describe('CheckoutSelectPaymentComponent', () => {
  let component: CheckoutSelectPaymentComponent;
  let fixture: ComponentFixture<CheckoutSelectPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutSelectPaymentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSelectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

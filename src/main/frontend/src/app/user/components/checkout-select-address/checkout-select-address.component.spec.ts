import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSelectAddressComponent } from './checkout-select-address.component';

describe('CheckoutSelectAddressComponent', () => {
  let component: CheckoutSelectAddressComponent;
  let fixture: ComponentFixture<CheckoutSelectAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutSelectAddressComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSelectAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

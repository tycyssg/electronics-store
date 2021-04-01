import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySaleProductsComponent } from './display-sale-products.component';

describe('DisplaySaleProductsComponent', () => {
  let component: DisplaySaleProductsComponent;
  let fixture: ComponentFixture<DisplaySaleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaySaleProductsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySaleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

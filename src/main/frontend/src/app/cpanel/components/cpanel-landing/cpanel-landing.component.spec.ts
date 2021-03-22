import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpanelLandingComponent } from './cpanel-landing.component';

describe('CpanelLandingComponent', () => {
  let component: CpanelLandingComponent;
  let fixture: ComponentFixture<CpanelLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpanelLandingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpanelLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

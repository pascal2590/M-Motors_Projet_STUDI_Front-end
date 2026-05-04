import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialDashboard } from './commercial-dashboard';

describe('CommercialDashboard', () => {
  let component: CommercialDashboard;
  let fixture: ComponentFixture<CommercialDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

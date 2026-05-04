import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialLayout } from './commercial-layout';

describe('CommercialLayout', () => {
  let component: CommercialLayout;
  let fixture: ComponentFixture<CommercialLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

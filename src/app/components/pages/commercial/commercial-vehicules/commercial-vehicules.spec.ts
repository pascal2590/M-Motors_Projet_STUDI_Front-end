import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialVehicules } from './commercial-vehicules';

describe('CommercialVehicules', () => {
  let component: CommercialVehicules;
  let fixture: ComponentFixture<CommercialVehicules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialVehicules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialVehicules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeDetail } from './vehicule-detail';

describe('VehiculeDetail', () => {
  let component: VehiculeDetail;
  let fixture: ComponentFixture<VehiculeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculeDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

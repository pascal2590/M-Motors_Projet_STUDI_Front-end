import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialVehiculeForm } from './commercial-vehicule-form';

describe('CommercialVehiculeForm', () => {
  let component: CommercialVehiculeForm;
  let fixture: ComponentFixture<CommercialVehiculeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialVehiculeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialVehiculeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

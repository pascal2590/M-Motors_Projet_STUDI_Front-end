import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeList } from './vehicule-list';

describe('VehiculeList', () => {
  let component: VehiculeList;
  let fixture: ComponentFixture<VehiculeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

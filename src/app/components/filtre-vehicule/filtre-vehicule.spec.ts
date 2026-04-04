import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreVehicule } from './filtre-vehicule';

describe('FiltreVehicule', () => {
  let component: FiltreVehicule;
  let fixture: ComponentFixture<FiltreVehicule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltreVehicule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltreVehicule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

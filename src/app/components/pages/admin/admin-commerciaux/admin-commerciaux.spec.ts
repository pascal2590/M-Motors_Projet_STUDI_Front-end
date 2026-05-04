import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommerciaux } from './admin-commerciaux';

describe('AdminCommerciaux', () => {
  let component: AdminCommerciaux;
  let fixture: ComponentFixture<AdminCommerciaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCommerciaux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCommerciaux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

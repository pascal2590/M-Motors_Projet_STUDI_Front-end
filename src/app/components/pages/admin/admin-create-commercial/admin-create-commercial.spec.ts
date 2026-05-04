import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCommercial } from './admin-create-commercial';

describe('AdminCreateCommercial', () => {
  let component: AdminCreateCommercial;
  let fixture: ComponentFixture<AdminCreateCommercial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateCommercial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateCommercial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierLld } from './dossier-lld';

describe('DossierLld', () => {
  let component: DossierLld;
  let fixture: ComponentFixture<DossierLld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierLld]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierLld);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

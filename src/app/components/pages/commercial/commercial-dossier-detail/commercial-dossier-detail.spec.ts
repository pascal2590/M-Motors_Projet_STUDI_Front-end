import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialDossierDetail } from './commercial-dossier-detail';

describe('CommercialDossierDetail', () => {
  let component: CommercialDossierDetail;
  let fixture: ComponentFixture<CommercialDossierDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialDossierDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialDossierDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

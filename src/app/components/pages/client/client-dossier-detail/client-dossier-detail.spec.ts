import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDossierDetailComponent } from './client-dossier-detail';

describe('ClientDossierDetail', () => {
  let component: ClientDossierDetailComponent;
  let fixture: ComponentFixture<ClientDossierDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDossierDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDossierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierAchat } from './dossier-achat';

describe('DossierAchat', () => {
  let component: DossierAchat;
  let fixture: ComponentFixture<DossierAchat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierAchat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierAchat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

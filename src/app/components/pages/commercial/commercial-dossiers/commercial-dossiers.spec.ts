import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommercialDossiers } from './commercial-dossiers';

describe('CommercialDossiers', () => {
  let component: CommercialDossiers;
  let fixture: ComponentFixture<CommercialDossiers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialDossiers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialDossiers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

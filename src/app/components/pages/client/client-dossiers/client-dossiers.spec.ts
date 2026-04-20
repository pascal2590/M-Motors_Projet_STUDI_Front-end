import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDossiersComponent } from './client-dossiers';

describe('ClientDossiersComponent', () => {
  let component: ClientDossiersComponent;
  let fixture: ComponentFixture<ClientDossiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDossiersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDossiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

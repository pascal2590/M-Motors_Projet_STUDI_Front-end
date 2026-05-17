import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VehiculeService } from './vehicule';
import { Vehicule } from '../models/vehicule.model';
import { environment } from '../../environments/environment';

describe('VehiculeService', () => {

  let service: VehiculeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculeService]
    });

    service = TestBed.inject(VehiculeService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should fetch vehicules', () => {

    const dummyVehicules: Vehicule[] = [
      {
        idVehicule: 1,
        marque: 'Peugeot',
        modele: '208',
        annee: 2020,
        kilometrage: 15000,
        prix: 15000,
        typeOffre: 'vente',
        disponible: true,
        dateAjout: new Date().toISOString()
      },
      {
        idVehicule: 2,
        marque: 'Renault',
        modele: 'Clio',
        annee: 2021,
        kilometrage: 10000,
        prix: 18000,
        typeOffre: 'location',
        disponible: true,
        dateAjout: new Date().toISOString()
      }
    ];

    service.getVehicules().subscribe(vehicules => {

      expect(vehicules.length).toBe(2);
      expect(vehicules).toEqual(dummyVehicules);

    });

    const req = httpMock.expectOne(`${environment.apiUrl}/vehicule`);

    expect(req.request.method).toBe('GET');

    req.flush(dummyVehicules);

  });

  afterEach(() => {

    httpMock.verify();

  });

});

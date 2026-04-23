import { TestBed } from '@angular/core/testing';
import { ServicesLldService } from './services-lld';


describe('ServicesLldService', () => {
  let service: ServicesLldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesLldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

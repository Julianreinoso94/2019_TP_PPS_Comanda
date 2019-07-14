import { TestBed } from '@angular/core/testing';

import { ReservasService } from './reservas.service';

describe('ReservasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservasService = TestBed.get(ReservasService);
    expect(service).toBeTruthy();
  });
});

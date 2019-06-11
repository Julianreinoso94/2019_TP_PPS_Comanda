import { TestBed } from '@angular/core/testing';

import { ComidasService } from './comidas.service';

describe('ComidasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComidasService = TestBed.get(ComidasService);
    expect(service).toBeTruthy();
  });
});

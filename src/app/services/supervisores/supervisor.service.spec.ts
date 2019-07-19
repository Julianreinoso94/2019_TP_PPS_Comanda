import { TestBed } from '@angular/core/testing';

import { SupervisorService } from './supervisor.service';

describe('SupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupervisorService = TestBed.get(SupervisorService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BackendEndpointsService } from './backend-endpoints.service';

describe('BackendEndpointsService', () => {
  let service: BackendEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BtnBuchungService } from './btn-buchung.service';

describe('BtnBuchungService', () => {
  let service: BtnBuchungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnBuchungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

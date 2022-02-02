import { TestBed } from '@angular/core/testing';

import { MttoCorrectiveService } from './mtto-corrective.service';

describe('MttoCorrectiveService', () => {
  let service: MttoCorrectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MttoCorrectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

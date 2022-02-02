import { TestBed } from '@angular/core/testing';

import { TypeSystemService } from './type-system.service';

describe('TypeSystemService', () => {
  let service: TypeSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

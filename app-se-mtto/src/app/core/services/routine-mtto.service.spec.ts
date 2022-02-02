import { TestBed } from '@angular/core/testing';

import { RoutineMttoService } from './routine-mtto.service';

describe('RoutineMttoService', () => {
  let service: RoutineMttoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineMttoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

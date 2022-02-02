import { TestBed } from '@angular/core/testing';

import { TypeComponentService } from './type-component.service';

describe('TypeComponentService', () => {
  let service: TypeComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

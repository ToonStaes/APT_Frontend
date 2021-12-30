import { TestBed } from '@angular/core/testing';

import { GerechtService } from './gerecht.service';

describe('GerechtService', () => {
  let service: GerechtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerechtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

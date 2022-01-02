import { TestBed } from '@angular/core/testing';

import { PersoneelService } from './personeel.service';

describe('PersoneelService', () => {
  let service: PersoneelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoneelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

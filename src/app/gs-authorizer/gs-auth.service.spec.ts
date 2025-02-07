import { TestBed } from '@angular/core/testing';

import { GsAuthService } from './gs-auth.service';

describe('GsAuthService', () => {
  let service: GsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

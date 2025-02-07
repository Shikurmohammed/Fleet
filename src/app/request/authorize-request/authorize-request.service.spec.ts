import { TestBed } from '@angular/core/testing';

import { AuthorizeRequestService } from './authorize-request.service';

describe('AuthorizeRequestService', () => {
  let service: AuthorizeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

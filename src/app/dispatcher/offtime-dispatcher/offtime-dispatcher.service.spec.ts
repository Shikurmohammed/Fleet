import { TestBed } from '@angular/core/testing';

import { OfftimeDispatcherService } from './offtime-dispatcher.service';

describe('OfftimeDispatcherService', () => {
  let service: OfftimeDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfftimeDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

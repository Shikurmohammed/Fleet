import { TestBed } from '@angular/core/testing';

import { SettlementRequesterGuard } from './settlement-requester.guard';

describe('SettlementRequesterGuard', () => {
  let guard: SettlementRequesterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SettlementRequesterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleAdvancePaymentComponent } from './settle-advance-payment.component';

describe('SettleAdvancePaymentComponent', () => {
  let component: SettleAdvancePaymentComponent;
  let fixture: ComponentFixture<SettleAdvancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettleAdvancePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettleAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

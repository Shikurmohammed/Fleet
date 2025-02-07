import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementOfficerHomeComponent } from './settlement-officer-home.component';

describe('SettlementOfficerHomeComponent', () => {
  let component: SettlementOfficerHomeComponent;
  let fixture: ComponentFixture<SettlementOfficerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettlementOfficerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettlementOfficerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

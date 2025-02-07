import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodianRequestsComponent } from './custodian-requests.component';

describe('CustodianRequestsComponent', () => {
  let component: CustodianRequestsComponent;
  let fixture: ComponentFixture<CustodianRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustodianRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustodianRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

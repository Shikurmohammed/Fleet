import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatcherFieldApprovalComponent } from './dispatcher-field-approval.component';

describe('DispatcherFieldApprovalComponent', () => {
  let component: DispatcherFieldApprovalComponent;
  let fixture: ComponentFixture<DispatcherFieldApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatcherFieldApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatcherFieldApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

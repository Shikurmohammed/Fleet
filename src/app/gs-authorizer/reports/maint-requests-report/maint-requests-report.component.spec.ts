import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintRequestsReportComponent } from './maint-requests-report.component';

describe('MaintRequestsReportComponent', () => {
  let component: MaintRequestsReportComponent;
  let fixture: ComponentFixture<MaintRequestsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintRequestsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintRequestsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

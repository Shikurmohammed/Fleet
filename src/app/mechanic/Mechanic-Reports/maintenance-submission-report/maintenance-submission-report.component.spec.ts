import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceSubmissionReportComponent } from './maintenance-submission-report.component';

describe('MaintenanceSubmissionReportComponent', () => {
  let component: MaintenanceSubmissionReportComponent;
  let fixture: ComponentFixture<MaintenanceSubmissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceSubmissionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceSubmissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

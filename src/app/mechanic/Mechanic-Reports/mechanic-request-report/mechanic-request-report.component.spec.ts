import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicRequestReportComponent } from './mechanic-request-report.component';

describe('MechanicRequestReportComponent', () => {
  let component: MechanicRequestReportComponent;
  let fixture: ComponentFixture<MechanicRequestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicRequestReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicRequestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

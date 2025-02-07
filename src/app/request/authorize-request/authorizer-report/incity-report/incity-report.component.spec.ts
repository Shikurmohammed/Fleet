import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncityReportComponent } from './incity-report.component';

describe('IncityReportComponent', () => {
  let component: IncityReportComponent;
  let fixture: ComponentFixture<IncityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

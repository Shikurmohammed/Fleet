import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfftimeReportComponent } from './offtime-report.component';

describe('OfftimeReportComponent', () => {
  let component: OfftimeReportComponent;
  let fixture: ComponentFixture<OfftimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfftimeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfftimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

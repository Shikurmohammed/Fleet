import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchListingReportComponent } from './dispatch-listing-report.component';

describe('DispatchListingReportComponent', () => {
  let component: DispatchListingReportComponent;
  let fixture: ComponentFixture<DispatchListingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispatchListingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispatchListingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

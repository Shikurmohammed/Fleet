import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintCompletionReportComponent } from './maint-completion-report.component';

describe('MaintCompletionReportComponent', () => {
  let component: MaintCompletionReportComponent;
  let fixture: ComponentFixture<MaintCompletionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintCompletionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintCompletionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

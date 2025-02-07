import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePrintComponent } from './advance-print.component';

describe('AdvancePrintComponent', () => {
  let component: AdvancePrintComponent;
  let fixture: ComponentFixture<AdvancePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancePrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

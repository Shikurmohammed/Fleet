import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDueComponent } from './insurance-due.component';

describe('InsuranceDueComponent', () => {
  let component: InsuranceDueComponent;
  let fixture: ComponentFixture<InsuranceDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceDueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

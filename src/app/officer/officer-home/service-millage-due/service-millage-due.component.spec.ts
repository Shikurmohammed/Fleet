import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMillageDueComponent } from './service-millage-due.component';

describe('ServiceMillageDueComponent', () => {
  let component: ServiceMillageDueComponent;
  let fixture: ComponentFixture<ServiceMillageDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMillageDueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceMillageDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

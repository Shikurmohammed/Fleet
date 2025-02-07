import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMaintenanceComponent } from './request-maintenance.component';

describe('RequestMaintenanceComponent', () => {
  let component: RequestMaintenanceComponent;
  let fixture: ComponentFixture<RequestMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

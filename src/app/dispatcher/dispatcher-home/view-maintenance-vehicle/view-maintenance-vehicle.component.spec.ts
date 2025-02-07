import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMaintenanceVehicleComponent } from './view-maintenance-vehicle.component';

describe('ViewMaintenanceVehicleComponent', () => {
  let component: ViewMaintenanceVehicleComponent;
  let fixture: ComponentFixture<ViewMaintenanceVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMaintenanceVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMaintenanceVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDispatchedVehicleComponent } from './view-dispatched-vehicle.component';

describe('ViewDispatchedVehicleComponent', () => {
  let component: ViewDispatchedVehicleComponent;
  let fixture: ComponentFixture<ViewDispatchedVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDispatchedVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDispatchedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

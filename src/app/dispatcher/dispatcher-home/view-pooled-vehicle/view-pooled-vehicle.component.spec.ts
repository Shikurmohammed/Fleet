import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPooledVehicleComponent } from './view-pooled-vehicle.component';

describe('ViewPooledVehicleComponent', () => {
  let component: ViewPooledVehicleComponent;
  let fixture: ComponentFixture<ViewPooledVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPooledVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPooledVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

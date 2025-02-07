import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDisposedVehicleComponent } from './view-disposed-vehicle.component';

describe('ViewDisposedVehicleComponent', () => {
  let component: ViewDisposedVehicleComponent;
  let fixture: ComponentFixture<ViewDisposedVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDisposedVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDisposedVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

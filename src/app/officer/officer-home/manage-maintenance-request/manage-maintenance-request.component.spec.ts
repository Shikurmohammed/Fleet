import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMaintenanceRequestComponent } from './manage-maintenance-request.component';

describe('ManageMaintenanceRequestComponent', () => {
  let component: ManageMaintenanceRequestComponent;
  let fixture: ComponentFixture<ManageMaintenanceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMaintenanceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMaintenanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

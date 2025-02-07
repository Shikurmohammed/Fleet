import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGarageComponent } from './manage-garage.component';

describe('ManageGarageComponent', () => {
  let component: ManageGarageComponent;
  let fixture: ComponentFixture<ManageGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGarageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdvComponent } from './manage-adv.component';

describe('ManageAdvComponent', () => {
  let component: ManageAdvComponent;
  let fixture: ComponentFixture<ManageAdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
